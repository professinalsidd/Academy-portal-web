import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoImg from "../../../assets/images/logo-transparent.png";
import { Link, useNavigate } from "react-router-dom";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";
import useResponsive from "../../../themes/themes";
import { genderAPI, roleAPI } from "../../../services/apis/dropdown";
import { signUpAPI } from "../../../services/apis/auth";
import { useDispatch } from "react-redux";
import { signUpReducer } from "../../../redux/slice/auth/authSlice";
import { COLORS } from "../../../themes/colors";
import { LAYOUT } from "../../../themes/layout";
import { styleAuth } from "./style";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import InputFormComp from "../../../components/common/InputForm/InputForm";
import { timeData } from "../../../db";

interface IFormInput {
  firstName: string;
  organizationName: string;
  email: string;
  phone: number;
  dateOfBirth: Date;
  password: string | number;
  confirmPassword: string | number;
  address: string;
}

const RegisterScreen = () => {
  const { isDesktop } = useResponsive();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [genderData, setGenderData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // API fetch for dropdown data
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

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);

  // Handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("check");
    console.log("Form Data:", data);

    // Build the payload
    const payload = {
      ...data,
      gender: selectedGender,
      role: selectedRole,
      classJoinTime: selectedTime,
    };
    try {
      // Call the sign-up API
      const response = await signUpAPI(payload);
      console.log("Sign Up Success:", response);

      // Dispatch the action
      dispatch(signUpReducer(response));

      // Show success message and navigate to login
      toast.success("Sign-up successful!");
      navigate("/login");

      // Reset the form after successful sign-up
      reset();
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.message || "Sign-up failed");
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15); // 15 years ago
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 60); // 60 years ago

  return (
    <Box
      sx={[
        LAYOUT.flexCCenter,
        {
          backgroundColor: COLORS.WHITE,
          position: isDesktop ? "absolute" : "relative",
          top: isDesktop ? 10 : 2,
          bottom: isDesktop ? 10 : 2,
          right: isDesktop ? 10 : 1,
          left: isDesktop ? 10 : 1,
          borderRadius: 2,
          p: 2,
        },
      ]}
    >
      <Grid spacing={2} container p={2} sx={[LAYOUT.flexCCenter]}>
        <Grid xs={12} md={6} sx={[LAYOUT.flexCCenter]}>
          <img
            src={LogoImg}
            alt="login"
            style={{
              objectFit: "contain",
              width: isDesktop ? "100%" : "30%",
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Box sx={[LAYOUT.columnCCenter, styleAuth.contentBox]}>
            <Typography variant="h6" m={1}>
              Register
            </Typography>
            <Box sx={[LAYOUT.flexColumnWithGap()]}>
              <Box
                display={"flex"}
                flexDirection={isDesktop ? "row" : "column"}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: "100%" }}
                >
                  <Box sx={[LAYOUT.flexRowWithGap()]}>
                    <InputFormComp
                      label="Organization Name"
                      {...register("organizationName", {
                        required: true,
                        pattern: /^[a-zA-Z0-9\s\-_,.()]+$/,
                      })}
                      maxLength={30}
                      placeHolder="Enter your Organization Name"
                      type="text"
                    />
                    <InputFormComp
                      label="Email Address"
                      {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      })}
                      placeHolder="Enter your Email Address"
                      type="email"
                    />
                  </Box>
                  <Box sx={[LAYOUT.flexRowWithGap()]}>
                    <InputFormComp
                      label="Phone Number"
                      maxLength={10}
                      {...register("phone", {
                        required: true,
                        pattern: /^[0-9]{10}$/,
                      })}
                      placeHolder="Enter your Phone Number"
                      type="text"
                    />
                    <InputFormComp
                      label="Date of Birth"
                      {...register("dateOfBirth", { required: true })}
                      type="date"
                      max={maxDate.toISOString().split("T")[0]}
                      min={minDate.toISOString().split("T")[0]}
                    />
                  </Box>
                  <Box sx={[LAYOUT.flexRowWithGap()]}>
                    <InputFormComp
                      label="Password"
                      {...register("password", { required: true })}
                      type="password"
                      placeHolder="Enter your password"
                    />
                  </Box>
                  <Box sx={[LAYOUT.flexRowWithGap()]}>
                    <InputFormComp
                      label="Confirm Password"
                      {...register("confirmPassword", { required: true })}
                      type="password"
                      placeHolder="Enter your confirm password"
                    />
                  </Box>
                  <Box sx={[LAYOUT.flexRowWithGap()]}>
                    <InputFormComp
                      label="Address"
                      {...register("address", { required: true })}
                      type="text"
                      placeHolder="Enter your address"
                    />
                  </Box>
                  <DropdownComp
                    label="Class Joining Time"
                    sx={{ flex: 1, width: "100%" }}
                    data={timeData}
                    onChange={setSelectedTime}
                    value={selectedTime}
                  />
                  <DropdownComp
                    label="Gender"
                    sx={{ flex: 1, width: "100%" }}
                    data={genderData}
                    onChange={setSelectedGender}
                    value={selectedGender}
                  />
                  <DropdownComp
                    label="Select Role"
                    sx={{ flex: 1, width: "100%" }}
                    data={roleData}
                    onChange={setSelectedRole}
                    value={selectedRole}
                  />
                  <Box sx={[LAYOUT.flexRowAJCenter, { width: "100%" }]}>
                    <Button type="submit">Submit</Button>
                  </Box>
                </form>
              </Box>
            </Box>
            <Box display={"flex"} m={1} flexDirection={"column"}>
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterScreen;
