import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoImg from "../../../assets/images/white-logo.png";
import InputComp from "../../../components/common/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";
import useResponsive from "../../../themes/themes";
import { genderAPI, roleAPI } from "../../../services/apis/dropdown";
import { signUpAPI } from "../../../services/apis/auth";
import { useDispatch } from "react-redux";
import { signUpReducer } from "../../../redux/slice/auth/authSlice";

const RegisterScreen = () => {
  const { isDesktop } = useResponsive();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [genderData, setGenderData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const submitHandler = (inputName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [inputName]: value,
    }));
  };

  useEffect(() => {}, [formData]);

  const dropdownFetchData = async () => {
    try {
      const genderResponse: any = await genderAPI();
      const roleResponse: any = await roleAPI();
      setRoleData(roleResponse?.data);
      setGenderData(genderResponse?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    dropdownFetchData();
  }, []);

  const signUpHandler = async () => {
    try {
      const payload = {
        organizationName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        gender: selectedGender,
        role: selectedRole,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      const response = await signUpAPI(payload);
      dispatch(signUpReducer(response));
      alert("signup success");
      // navigate("/");
    } catch (error) {
      console.log("error", error);
      alert("signup error");
    }
  };

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
          p: isDesktop ? 3 : 0,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={isDesktop ? "space-between" : "center"}
          alignItems={"center"}
          flexDirection={isDesktop ? "row" : "column"}
          mt={isDesktop ? undefined : 38}
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <img
              src={LogoImg}
              alt="login"
              style={{
                objectFit: "contain",
                width: isDesktop ? "100%" : "30%",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              width: "100%",
            }}
          >
            <Typography variant="h6" m={1}>
              Register
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={isDesktop ? "row" : "column"}
              >
                <InputComp
                  label="Organization Name"
                  tooltipContent="Organization Name"
                  type="text"
                  sx={{ flex: 1 }}
                  value={formData.fullName}
                  onChange={(e) => submitHandler("fullName", e.target.value)}
                />
                <InputComp
                  label="Email Address"
                  tooltipContent="Email Address"
                  type="email"
                  sx={{ flex: 1 }}
                  value={formData.email}
                  onChange={(e) => submitHandler("email", e.target.value)}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={isDesktop ? "row" : "column"}
              >
                <InputComp
                  label="Phone Number"
                  tooltipContent="Phone Number"
                  type="number"
                  sx={{ flex: 1 }}
                  value={formData.phone}
                  onChange={(e) => submitHandler("phone", e.target.value)}
                />
                <DropdownComp
                  label="Gender"
                  sx={{ flex: 1 }}
                  data={genderData}
                  onChange={setSelectedGender}
                  value={selectedGender}
                />
              </Box>
              <Box display={"flex"}>
                <InputComp
                  label=""
                  tooltipContent="Date of birth"
                  type="date"
                  sx={{ flex: 1 }}
                  value={formData.date}
                  onChange={(e) => submitHandler("date", e.target.value)}
                />
                <InputComp
                  label=""
                  tooltipContent="Class Time"
                  type="time"
                  sx={{ flex: 1 }}
                  value={formData.time}
                  onChange={(e) => submitHandler("time", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => submitHandler("password", e.target.value)}
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
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    submitHandler("confirmPassword", e.target.value)
                  }
                />
              </Box>
              <InputComp
                label="Address"
                tooltipContent="Address"
                type="text"
                multiline
                value={formData.address}
                onChange={(e) => submitHandler("address", e.target.value)}
              />
              <DropdownComp
                label="Select Role"
                sx={{ flex: 1 }}
                data={roleData}
                onChange={setSelectedRole}
                value={selectedRole}
              />
            </Box>
            <Box display={"flex"} m={1} flexDirection={"column"}>
              <Button onClick={signUpHandler} variant="outlined">
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
