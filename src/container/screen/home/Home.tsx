import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../../../components/sidebar";
import DashboardScreen from "../dashboard/Dashboard";
import useResponsive from "../../../themes/themes";

function HomeScreen() {
  const { isDesktop } = useResponsive();
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuSelect = (index: number) => {
    setSelectedMenu(index);
  };

  const renderItem = () => {
    switch (selectedMenu) {
      case 0:
        return <DashboardScreen />;
      case 1:
        return <Typography>Profile</Typography>;
      case 2:
        return <Typography>data</Typography>;
      default:
        return <Typography>Dashbaord</Typography>;
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
