import { Box, Typography, Button, Avatar } from "@mui/material";
import React from "react";
import LogoImg from "../../../assets/images/logo.png";

const DashboardScreen = () => {
  return (
    <Box>
      <Box>
        <Button>Join Class</Button>
        <Avatar alt="Remy Sharp" src={LogoImg} />
      </Box>
    </Box>
  );
};

export default DashboardScreen;
