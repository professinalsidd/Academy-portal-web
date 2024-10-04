import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import WrapperComp from "../../../components/common/Wrapper";
import {
  dashBoardCardData,
  projectsTableColumnsForAdmin,
  projectsTableColumnsForStudents,
} from "../../../db";
import useResponsive from "../../../themes/themes";
import { useSelector } from "react-redux";
import InputComp from "../../../components/common/Input/Input";
import { resultStyle } from "../results/style";
import {
  AllStudentProjectsAPI,
  studentProjectsAPI,
  uploadProjectsAPI,
} from "../../../services/apis/projects";
import { toast } from "react-toastify";

const ResultScreen = () => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const store = useSelector((state: any) => state.auth.login.data);
  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const AllFetchData = async () => {
    try {
      if (store.user.role === "Admin") {
        const allProjects = await AllStudentProjectsAPI(store.token);
        setAllProjectsData(allProjects.data.projects);
      } else {
        const studentData = await studentProjectsAPI(store.token);
        setStudentData(studentData?.data.projects);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  const submitHandler = async () => {
    // Validation function to check if the githubLink is valid
    const isValidGithubLink = (url: string) => {
      const githubRegex =
        /^(https:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
      return githubRegex.test(url);
    };

    // Check if the githubLink is valid
    if (!isValidGithubLink(githubLink)) {
      toast.warn("Please enter a valid GitHub link.");
      return;
    }

    const payload = {
      projectName: projectName,
      githubLink: githubLink,
    };

    try {
      const response = await uploadProjectsAPI(store?.token, payload);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error("error", error);
    }
  };

  return (
    <WrapperComp title="Projects">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={resultStyle.root}
      >
        {dashBoardCardData.map((item) => (
          <Box
            key={item.label}
            sx={[
              resultStyle.subRoot,
              {
                width: isMobile ? "30%" : isTablet ? "40%" : "60",
              },
            ]}
          >
            <Box
              sx={[
                resultStyle.iconBox,
                {
                  background: item.bg,
                  color: item.color,
                },
              ]}
            >
              <Typography>
                <i className={item.icon}></i>
              </Typography>
            </Box>
            <Typography
              mt={2}
              textAlign={"center"}
              fontSize={isMobile ? 12 : isTablet ? 16 : 18}
              textTransform={"uppercase"}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
      {store.user.role !== "Admin" && (
        <Box sx={resultStyle.listBox}>
          <InputComp
            label="ProjectName"
            tooltipContent="ProjectName"
            type="text"
            sx={{ flex: 1 }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <InputComp
            label="githubLink"
            tooltipContent="githubLink"
            type="text"
            sx={{ flex: 1 }}
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
          <Button variant="outlined" onClick={submitHandler}>
            Submit
          </Button>
        </Box>
      )}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={isDesktop ? "row" : "column"}
        gap={2}
        mt={2}
      >
        <CardComp sx={{ width: "100%" }} fullCard>
          <TableComp
            data={store.user.role === "Admin" ? allProjectsData : studentData}
            title={
              store.user.role === "Admin"
                ? "All Students Projects List"
                : "Projects List"
            }
            columns={
              store.user.role === "Admin"
                ? projectsTableColumnsForAdmin
                : projectsTableColumnsForStudents
            }
          />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default ResultScreen;
