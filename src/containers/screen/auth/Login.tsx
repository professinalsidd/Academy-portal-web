import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import LogoImg from "../../../assets/images/logo.png";
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
import { COLORS } from "../../../themes/colors";

const LoginScreen = () => {
  const store = useSelector((state: any) => state?.auth?.login || {});
  const dispatch = useDispatch();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const response = await loginAPI(store?.token, data);
      setLoading(false);
      dispatch(loginReducer(response));
      toast.success("Login success");
      navigate("/");
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const styles = {
    backgroundColor: COLORS.WHITE,
    position: isDesktop ? "absolute" : "relative",
    top: isDesktop ? 10 : 2,
    bottom: isDesktop ? 10 : 2,
    right: isDesktop ? 10 : 1,
    left: isDesktop ? 10 : 1,
    borderRadius: 2,
    p: 2,
  };

  return (
    <>
      <Box sx={[LAYOUT.flexCCenter, styles]}>
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
          <Grid xs={12} md={6} p={2}>
            <Box
              sx={[
                { width: isDesktop ? "50%" : "100%", p: 2 },
                styleAuth.contentBox,
              ]}
            >
              <Typography variant="h6" m={1}>
                Login
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={[LAYOUT.flexColumn]} pr={2}>
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
                    disabled={loading}
                  >
                    {loading ? "Loading.." : "Login"}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginScreen;
