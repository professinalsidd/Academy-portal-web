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
import { LAYOUT } from "../../../themes/layout";

const AdminHomeScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
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
  const [classJoined, setClassJoined] = useState<any>([]);
  const { isDesktop, isMobile, isTablet } = useResponsive();

  const AllFetchData = async () => {
    try {
      const allResults = await AllStudentResultsAPI(store?.token);
      setSetShowAllStudentsResult(allResults?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AllClassJoinedData = async () => {
    try {
      const allClassJoined = await AllStudentClassesAPI(store.token);
      setClassJoined(allClassJoined?.data?.students);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AllStudentsFetchData = async () => {
    try {
      const allStudents = await AllStudentsAPI(store?.token);
      setShowAllStudents(allStudents?.data?.students);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AllPaymentFetchData = async () => {
    try {
      const allPayments = await AllStudentPaymentAPI(store?.token);
      setShowAllStudentsPayments(allPayments?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AllProjectFetchData = async () => {
    try {
      const allProjects = await AllStudentProjectsAPI(store?.token);
      setShowAllStudentSProjects(allProjects?.data?.projects);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AllStudentFetchData = async () => {
    try {
      const allStudentsClass: any = await AllStudentClassesAPI(store?.token);
      setShowAllStudentsJoinedData(allStudentsClass?.data?.students);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    AllFetchData();
    AllStudentFetchData();
    AllProjectFetchData();
    AllPaymentFetchData();
    AllStudentsFetchData();
    AllClassJoinedData();
  }, []);

  const countStudent = showAllStudentsJoinedData?.length || 0;
  const projectsCount = showAllStudentsProjects?.length || 0;
  const resultsCount = showAllStudentsResult?.length || 0;
  const paymentsCount = showAllStudentPayments?.length || 0;
  const allStudent = showAllStudents?.length || 0;

  return (
    <WrapperComp title="Welcome Back NextGen Coder Program Academy">
      <Box sx={[LAYOUT.flexWrapRowWithGap()]}>
        {/* <CardComp
          icon="fa-layer-group"
          title="Joined Classes"
          count={countStudent}
        /> */}
        <CardComp
          icon="fa-diagram-project"
          title="Total Students Projects"
          count={projectsCount}
        />
        <CardComp
          icon="fa-square-poll-vertical"
          title="Total Students Results"
          count={resultsCount}
        />
        <CardComp
          icon="fa-indian-rupee-sign"
          title="Total Students Payments"
          count={paymentsCount}
        />
        <CardComp
          icon="fa-users"
          title="Totals Joined Students"
          count={allStudent}
        />
      </Box>
      <Box
        sx={[LAYOUT.flexRowBetween]}
        flexDirection={isDesktop ? "row" : "column"}
        mt={2}
      >
        <CardComp fullCard>
          <TableComp
            title="All Student Class Joined List"
            columns={["organizationName", "email", "classCount"]}
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
