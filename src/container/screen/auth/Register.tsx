import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoImg from "../../../assets/images/white-logo.png";
import InputComp from "../../../components/common/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
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
          <Box sx={{}}>
            <Typography variant="h6" m={1}>
              Register
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box display={"flex"}>
                <InputComp
                  label="FullName"
                  tooltipContent="FullName"
                  type="text"
                  sx={{ flex: 1 }}
                />
                <InputComp
                  label="Email Address"
                  tooltipContent="Email Address"
                  type="email"
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box display={"flex"}>
                <InputComp
                  label="Phone Number"
                  tooltipContent="Phone Number"
                  type="number"
                  sx={{ flex: 1 }}
                />
                <DropdownComp label="Gender" sx={{ flex: 1 }} />
              </Box>
              <Box display={"flex"}>
                <InputComp
                  label=""
                  tooltipContent="Date of birth"
                  type="date"
                  sx={{ flex: 1 }}
                />
                <InputComp
                  label=""
                  disabled
                  tooltipContent="Class Time"
                  type="time"
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box display={"flex"}>
                <InputComp
                  label="Password"
                  tooltipContent="Password"
                  type="password"
                  icon
                  showPassword={showPassword}
                  handleClickShowPassword={() => setShowPassword(!showPassword)}
                  sx={{ flex: 1 }}
                />
                <InputComp
                  label="Confirm Password"
                  tooltipContent="Confirm Password"
                  type="password"
                  icon
                  showPassword={confirmPasswordShow}
                  handleClickShowPassword={() =>
                    setConfirmPasswordShow(!confirmPasswordShow)
                  }
                  sx={{ flex: 1 }}
                />
              </Box>
              <InputComp
                label="Address"
                disabled
                tooltipContent="Address"
                type="text"
                multiline
              />
            </Box>
            <Box display={"flex"} m={1} flexDirection={"column"}>
              <Button onClick={() => navigate("/")} variant="outlined">
                Register
              </Button>
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                Already you have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
