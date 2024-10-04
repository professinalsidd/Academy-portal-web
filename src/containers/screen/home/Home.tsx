import { Box } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../../../components/sidebar";
import DashboardScreen from "../dashboard/Dashboard";
import useResponsive from "../../../themes/themes";
import ProfileScreen from "../profile/Profile";
import ProjectScreen from "../projects/Project";
import ResultScreen from "../results/Result";
import Overview from "../Overview/OverView";
import PaymentsScreen from "../payments/Payments";
import { useSelector } from "react-redux";
import AdminHomeScreen from "../../admin/admin-home/AdminHome";

function HomeScreen() {
  const store = useSelector((state: any) => state?.auth?.login?.data?.user);
  console.log("store", store);
  const { isDesktop } = useResponsive();
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuSelect = (index: number) => {
    setSelectedMenu(index);
  };

  const renderItem = () => {
    switch (selectedMenu) {
      case 0:
        return store.role === "Admin" ? (
          <AdminHomeScreen />
        ) : (
          <DashboardScreen />
        );
      case 1:
        return <ProfileScreen />;
      case 2:
        return <ProjectScreen />;
      case 3:
        return <ResultScreen />;
      case 4:
        return <PaymentsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <Box display={isDesktop ? "flex" : "block"}>
      <SideBar barSelected={handleMenuSelect} />
      <Box sx={{ flexGrow: isDesktop ? 1 : 0, p: 2, mt: isDesktop ? 0 : 5 }}>
        {renderItem()}
      </Box>
    </Box>
  );
}

export default HomeScreen;
