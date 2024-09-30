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
import { styleAuth } from "./style";

const LoginScreen = () => {
  const store = useSelector((state: any) => state.auth?.login || {});
  const dispatch = useDispatch();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("data", data);
      const response = await loginAPI(store.token, data);
      dispatch(loginReducer(response)); // Ensure correct structure in reducer
      toast.success("login success");
      navigate("/");
      reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box sx={[LAYOUT.flexCCenter, styleAuth.loginRoot]}>
      <Box sx={styleAuth.card}>
        <Box
          sx={[LAYOUT.flexRowBetween]}
          flexDirection={isDesktop ? "row" : "column"}
        >
          <Box sx={[LAYOUT.flexRowBetween]}>
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
                />
              </Box>
              <Box sx={[LAYOUT.flexCCenter, { width: "100%" }]}>
                <Button
                  type="submit"
                  sx={{ width: "50%", mt: 2 }}
                  variant="outlined"
                >
                  Login
                </Button>
              </Box>
            </form>
            <Box display={"flex"} m={1} flexDirection={"column"}>
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
