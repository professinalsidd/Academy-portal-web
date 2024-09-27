import { Box } from "@mui/material";
import WrapperComp from "../../../components/common/Wrapper";
import useResponsive from "../../../themes/themes";
import CardComp from "../../../components/common/Card/Card";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { studentClassesAPI } from "../../../services/apis/classes";
import TableComp from "../../../components/common/Table/Table";
import { studentProjectsAPI } from "../../../services/apis/projects";

const DashboardScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const [studentJoinedClass, setStudentJoinedClass] = useState<any>([]);
  const [projectData, setProjectData] = useState<any>([]);

  const AllFetchData = async () => {
    try {
      const response = await studentClassesAPI(
        store.token,
        store.user.studentId
      );
      const projectRes = await studentProjectsAPI(store.token);
      setStudentJoinedClass(response.data.joinedClasses);
      setProjectData(projectRes.data.projects);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  const joinedClassCount = studentJoinedClass.length || 0;
  const projectCount = projectData.length || 0;

  return (
    <WrapperComp title="Welcome Back NextGen Coder Program Academy">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <CardComp
          icon="fa-layer-group"
          title="Joined Classes"
          count={joinedClassCount}
        />
        <CardComp
          icon="fa-diagram-project"
          title="Project Uploaded"
          count={projectCount}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={isDesktop ? "row" : "column"}
        gap={2}
        mt={2}
      >
        <CardComp fullCard>
          <TableComp
            columns={["joinDate", "classLink"]}
            data={studentJoinedClass}
          />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default DashboardScreen;
