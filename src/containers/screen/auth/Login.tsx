import { Box, Button, Typography } from "@mui/material";
import LogoImg from "../../../assets/images/white-logo.png";
import { Link, useNavigate } from "react-router-dom";
import useResponsive from "../../../themes/themes";
import { loginReducer } from "../../../redux/slice/auth/authSlice";
import { loginAPI } from "../../../services/apis/auth";
import { useDispatch, useSelector } from "react-redux";
import InputFormComp from "../../../components/common/InputForm/InputForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { LAYOUT } from "../../../themes/layout";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const dispatch = useDispatch();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await loginAPI(store.token, data);
      dispatch(loginReducer(response));
      toast.success("login success");
      navigate("/");
      reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
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
          p: 3,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={isDesktop ? "row" : "column"}
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <img
              src={LogoImg}
              alt="login"
              style={{
                objectFit: "contain",
                width: "100%",
                height: isDesktop ? undefined : 100,
              }}
            />
          </Box>
          <Box sx={{ width: isDesktop ? "60%" : "100%" }}>
            <Typography variant="h6" m={1}>
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={[LAYOUT.flexColumn]}>
                <InputFormComp
                  label="Email Address"
                  placeHolder="Enter your email"
                  type="email"
                  {...register("email", { required: true })}
                />
                <InputFormComp
                  label="Password"
                  placeHolder="Enter your password"
                  type="password"
                  {...register("password", { required: true })}
                  action
                />
              </Box>
              <Box sx={[LAYOUT.flexCCenter, { width: "100%" }]}>
                <Button type="submit" sx={{ width: "50%" }} variant="outlined">
                  Login
                </Button>
              </Box>
            </form>
            <Box display={"flex"} m={1} flexDirection={"column"}>
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                Don't you have an account?
                <Link to="/register" style={{ textDecoration: "none" }}>
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
