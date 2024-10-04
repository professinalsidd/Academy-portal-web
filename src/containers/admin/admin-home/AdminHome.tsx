import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import useResponsive from "../../../themes/themes";
import { AllStudentClassesAPI } from "../../../services/apis/classes";
import { useSelector } from "react-redux";
import TableComp from "../../../components/common/Table/Table";
import {
  AllAdminStateAPI,
  AllStudentsAPI,
} from "../../../services/apis/allStudents";
import { LAYOUT } from "../../../themes/layout";
import LoadingComp from "../../../components/common/loading/Loading";

const AdminHomeScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [loading, setLoading] = useState(false);
  const [adminStatic, setAdminStatic] = useState<any>();
  const [showAllStudents, setShowAllStudents] = useState<any>([]);
  const [classJoined, setClassJoined] = useState<any>([]);
  const { isDesktop } = useResponsive();

  const AllFetchData = async () => {
    setLoading(true);
    try {
      if (store.user.role === "Admin") {
        const response: any = await AllAdminStateAPI(store?.token);
        const allClassJoined = await AllStudentClassesAPI(store.token);
        const allStudents = await AllStudentsAPI(store?.token);
        setLoading(false);
        setAdminStatic(response.data);
        setShowAllStudents(allStudents?.data?.students);
        setClassJoined(allClassJoined?.data?.students);
      } else {
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  return (
    <WrapperComp title="Welcome Back NextGen Coder Program Academy">
      {loading ? (
        <LoadingComp loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <Box sx={[LAYOUT.flexWrapRowWithGap()]}>
            <CardComp
              icon="fa-layer-group"
              title="Joined Classes"
              count={adminStatic?.totalClassJoins}
            />
            <CardComp
              icon="fa-diagram-project"
              title="Total Students Projects"
              count={adminStatic?.totalProjects}
            />
            <CardComp
              icon="fa-square-poll-vertical"
              title="Total Students Results"
              count={adminStatic?.totalResults}
            />
            <CardComp
              icon="fa-indian-rupee-sign"
              title="Total Students Payments"
              count={adminStatic?.totalPayments}
            />
            <CardComp
              icon="fa-users"
              title="Totals Students Joined"
              count={adminStatic?.totalStudentSignUps}
            />
          </Box>
          <Box sx={[]} flexDirection={isDesktop ? "row" : "column"} mt={2}>
            <CardComp fullCard>
              <TableComp
                title="All Student Class Joined List"
                columns={["organizationName", "email", "classCount"]}
                data={classJoined}
              />
            </CardComp>
            <CardComp fullCard sx={{ mt: 2 }}>
              <TableComp
                title="All Student Joined List"
                columns={["organizationName", "email", "role", "phone"]}
                data={showAllStudents}
              />
            </CardComp>
          </Box>
        </>
      )}
    </WrapperComp>
  );
};

export default AdminHomeScreen;
