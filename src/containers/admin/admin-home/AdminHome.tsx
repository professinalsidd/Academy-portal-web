import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import useResponsive from "../../../themes/themes";
import { AllStudentClassesAPI } from "../../../services/apis/classes";
import { useSelector } from "react-redux";

const AdminHomeScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  console.log("store", store);
  const [showAllStudentsJoinedData, setShowAllStudentsJoinedData] =
    useState<any>([]);
  const { isDesktop, isMobile, isTablet } = useResponsive();

  const AllStudentsJoinedFetchData = async () => {
    try {
      const data: any = await AllStudentClassesAPI(store?.token);
      setShowAllStudentsJoinedData(data?.data?.students);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    AllStudentsJoinedFetchData();
  }, []);

  const countStudent = showAllStudentsJoinedData.length || 0;

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
          icon="fa-users"
          title="Students Joined"
          count={countStudent}
        />
        <CardComp
          icon="fa-users"
          title="Students Joined"
          count={countStudent}
        />
      </Box>
    </WrapperComp>
  );
};

export default AdminHomeScreen;
