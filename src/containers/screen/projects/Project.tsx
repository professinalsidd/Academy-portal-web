import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import WrapperComp from "../../../components/common/Wrapper";
import {
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
import LoadingComp from "../../../components/common/loading/Loading";
import { githubRegex } from "../../../utils";

const ResultScreen = () => {
  const { isDesktop } = useResponsive();
  const store = useSelector((state: any) => state.auth.login.data);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const AllFetchData = async () => {
    setLoading(true);
    try {
      if (store.user.role === "Admin") {
        const allProjects = await AllStudentProjectsAPI(store.token);
        setLoading(false);
        setAllProjectsData(allProjects.data.projects);
      } else {
        const studentData = await studentProjectsAPI(store.token);
        setLoading(false);
        setStudentData(studentData?.data.projects);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  const submitHandler = async () => {
    setLoading(true);
    // Validation function to check if the githubLink is valid
    const isValidGithubLink = (url: string) => {
      const github = githubRegex;
      return github.test(url);
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
      setLoading(false);
      toast.success(response.data.message);
      setProjectName("");
      setGithubLink("");
      AllFetchData();
    } catch (error: any) {
      setLoading(false);
      toast.error("error", error);
    }
  };

  return (
    <WrapperComp title="Projects">
      {loading ? (
        <LoadingComp loading={loading} setLoading={setLoading} />
      ) : (
        <>
          {store.user.role !== "Admin" && (
            <Box
              sx={[
                resultStyle.listBox,
                {
                  mt: isDesktop ? 2 : 8,
                },
              ]}
            >
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
                data={
                  store.user.role === "Admin" ? allProjectsData : studentData
                }
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
        </>
      )}
    </WrapperComp>
  );
};

export default ResultScreen;
