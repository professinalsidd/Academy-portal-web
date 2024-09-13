import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoImg from "../../../assets/images/white-logo.png";
import InputComp from "../../../components/common/Input/Input";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <img
              src={LogoImg}
              alt="login"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </Box>
          <Box sx={{ width: "60%" }}>
            <Typography variant="h6" m={1}>
              Login
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InputComp
                label="Email Address"
                tooltipContent="Email Address"
                type="email"
                sx={{ flex: 1 }}
              />
              <InputComp
                label="Password"
                tooltipContent="Password"
                type="password"
                icon
                showPassword={showPassword}
                handleClickShowPassword={() => setShowPassword(!showPassword)}
                sx={{ flex: 1 }}
              />
            </Box>
            <Box display={"flex"} m={1} flexDirection={"column"}>
              <Button onClick={() => navigate("/")} variant="outlined">
                Login
              </Button>
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                Don't you have an account?
                <Link to="/register" style={{ textDecoration: "none" }}>
                  {" "}
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
