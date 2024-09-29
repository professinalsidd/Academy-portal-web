import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";
import InputFormComp from "../../../components/common/InputForm/InputForm";
import { timeData } from "../../../db";
import { LAYOUT } from "../../../themes/layout";
import { styleAuth } from "../../screen/auth/style";
import useResponsive from "../../../themes/themes";
import { emailRegex, fullNameRegex, phoneRegex } from "../../../utils";

type RegisterType = {
  handleSubmit: any;
  register: any;
  onSubmit: any;
  setSelectedTime: any;
  selectedTime: any;
  setSelectedGender: any;
  selectedGender: any;
  setSelectedRole: any;
  selectedRole: any;
  roleData: any;
  genderData: any;
};

const RegisterFragment = ({
  handleSubmit,
  register,
  onSubmit,
  selectedGender,
  selectedRole,
  selectedTime,
  setSelectedGender,
  setSelectedRole,
  setSelectedTime,
  roleData,
  genderData,
}: RegisterType) => {
  const { isDesktop } = useResponsive();
  return (
    <Box sx={[LAYOUT.columnCCenter, styleAuth.contentBox]}>
      <Typography variant="h6" ml={1}>
        Register
      </Typography>
      <Box sx={[LAYOUT.flexColumnWithGap()]}>
        <Box display={"flex"} flexDirection={isDesktop ? "row" : "column"}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
              sx={[isDesktop ? LAYOUT.flexRowWithGap() : LAYOUT.columnCCenter]}
            >
              <InputFormComp
                label="Organization Name"
                {...register("organizationName", {
                  required: true,
                  pattern: fullNameRegex,
                })}
                maxLength={30}
                placeHolder="Enter your Organization Name"
                type="text"
              />
              <InputFormComp
                label="Email Address"
                {...register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
                placeHolder="Enter your Email Address"
                type="email"
              />
            </Box>
            <Box
              sx={[isDesktop ? LAYOUT.flexRowWithGap() : LAYOUT.columnCCenter]}
            >
              <InputFormComp
                label="Phone Number"
                maxLength={10}
                {...register("phone", {
                  required: true,
                  pattern: phoneRegex,
                })}
                placeHolder="Enter your Phone Number"
                type="text"
              />
              <InputFormComp
                label="Date of Birth"
                {...register("dateOfBirth", { required: true })}
                type="date"
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
            <Box sx={[LAYOUT.flexRowWithGap()]}>
              <DropdownComp
                label="Class Joining Time"
                sx={{ flex: 1, width: "100%" }}
                data={timeData}
                onChange={setSelectedTime}
                value={selectedTime}
              />
            </Box>
            <Box sx={[LAYOUT.flexRowWithGap()]}>
              <DropdownComp
                label="Gender"
                sx={{ flex: 1, width: "100%" }}
                data={genderData}
                onChange={setSelectedGender}
                value={selectedGender}
              />
            </Box>
            <Box sx={[LAYOUT.flexRowWithGap()]}>
              <DropdownComp
                label="Select Role"
                sx={{ flex: 1, width: "100%" }}
                data={roleData}
                onChange={setSelectedRole}
                value={selectedRole}
              />
            </Box>
            <Box sx={[LAYOUT.flexCCenter, { width: "100%" }]}>
              <Button type="submit" sx={{ width: "50%" }} variant="outlined">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Box display={"flex"} m={1} flexDirection={"column"}>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterFragment;
