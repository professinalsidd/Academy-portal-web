import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LogoImg from "../../../assets/images/logo-transparent.png";
import { useNavigate } from "react-router-dom";
import useResponsive from "../../../themes/themes";
import { genderAPI, roleAPI } from "../../../services/apis/dropdown";
import { signUpAPI } from "../../../services/apis/auth";
import { useDispatch } from "react-redux";
import { signUpReducer } from "../../../redux/slice/auth/authSlice";
import { COLORS } from "../../../themes/colors";
import { LAYOUT } from "../../../themes/layout";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import RegisterFragment from "../../fragments/auth/Register";

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
          <RegisterFragment
            handleSubmit={handleSubmit}
            register={register}
            onSubmit={onSubmit}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            setSelectedGender={setSelectedGender}
            selectedGender={selectedGender}
            setSelectedRole={setSelectedRole}
            selectedRole={selectedRole}
            roleData={roleData}
            genderData={genderData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterScreen;
