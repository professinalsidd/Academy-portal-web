import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../../../components/sidebar";

function HomeScreen() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuSelect = (index: number) => {
    setSelectedMenu(index);
  };

  const renderItem = () => {
    switch (selectedMenu) {
      case 0:
        return <Typography>Dashbaord</Typography>;
      case 1:
        return <Typography>Profile</Typography>;
      case 2:
        return <Typography>data</Typography>;
      default:
        return <Typography>Dashbaord</Typography>;
    }
  };

  return (
    <Box display={"flex"}>
      <SideBar barSelected={handleMenuSelect} />
      <Box sx={{ flexGrow: 1, p: 4 }}>{renderItem()}</Box>
    </Box>
  );
}

export default HomeScreen;
