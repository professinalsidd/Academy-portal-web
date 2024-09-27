import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import useResponsive from "../../../themes/themes";
import { AllStudentClassesAPI } from "../../../services/apis/classes";
import { useSelector } from "react-redux";
import { AllStudentProjectsAPI } from "../../../services/apis/projects";
import { AllStudentResultsAPI } from "../../../services/apis/results";
import { AllStudentPaymentAPI } from "../../../services/apis/payments";
import TableComp from "../../../components/common/Table/Table";
import { AllStudentsAPI } from "../../../services/apis/allStudents";

const AdminHomeScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  console.log("store", store);
  const [showAllStudentsJoinedData, setShowAllStudentsJoinedData] =
    useState<any>([]);
  const [showAllStudentsProjects, setShowAllStudentSProjects] = useState<any>(
    []
  );
  const [showAllStudentsResult, setSetShowAllStudentsResult] = useState<any>(
    []
  );
  const [showAllStudentPayments, setShowAllStudentsPayments] = useState<any>(
    []
  );
  const [showAllStudents, setShowAllStudents] = useState<any>([]);
  const [classJoined, setClassJoined] = useState([]);

  const { isDesktop, isMobile, isTablet } = useResponsive();

  const AllFetchData = async () => {
    try {
      const allStudentsClass: any = await AllStudentClassesAPI(store?.token);
      const allProjects = await AllStudentProjectsAPI(store?.token);
      const allResults = await AllStudentResultsAPI(store?.token);
      const allPayments = await AllStudentPaymentAPI(store?.token);
      const allStudents = await AllStudentsAPI(store?.token);
      const allClassJoined = await AllStudentClassesAPI(store.token);
      setClassJoined(allClassJoined.data.students);
      setShowAllStudentsJoinedData(allStudentsClass?.data?.students);
      setShowAllStudentSProjects(allProjects?.data?.projects);
      setSetShowAllStudentsResult(allResults?.data?.results);
      setShowAllStudentsPayments(allPayments?.data);
      setShowAllStudents(allStudents?.data?.students);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  const countStudent = showAllStudentsJoinedData.length || 0;
  const projectsCount = showAllStudentsProjects.length || 0;
  const resultsCount = showAllStudentsResult.length || 0;
  const paymentsCount = showAllStudentPayments.length || 0;
  const allStudent = showAllStudents.length || 0;

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
          count={countStudent}
        />
        <CardComp
          icon="fa-diagram-project"
          title="Student Projects"
          count={projectsCount}
        />
        <CardComp
          icon="fa-square-poll-vertical"
          title="Students Results"
          count={resultsCount}
        />
        <CardComp
          icon="fa-indian-rupee-sign"
          title="Payments"
          count={paymentsCount}
        />
        <CardComp icon="fa-users" title="Joined Students" count={allStudent} />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={isDesktop ? "row" : "column"}
        mt={2}
      >
        <CardComp fullCard>
          <TableComp
            title="All Student Class Joined List"
            columns={["organizationName", "email"]}
            data={classJoined}
          />
        </CardComp>
        <CardComp fullCard>
          <TableComp
            title="All Student Joined List"
            columns={["organizationName", "email", "role", "phone"]}
            data={showAllStudents}
          />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default AdminHomeScreen;
