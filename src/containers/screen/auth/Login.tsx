import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LogoImg from "../../../assets/images/white-logo.png";
import InputComp from "../../../components/common/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import useResponsive from "../../../themes/themes";
import { loginReducer } from "../../../redux/slice/auth/authSlice";
import { loginAPI } from "../../../services/apis/auth";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const dispatch = useDispatch();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (inputName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [inputName]: value,
    }));
  };

  useEffect(() => {}, [formData]);

  const loginHandler = async () => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const response = await loginAPI(store.token, payload);
      dispatch(loginReducer(response));
      alert("login success");
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
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
                value={formData.email}
                onChange={(e) => submitHandler("email", e.target.value)}
              />
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
            </Box>
            <Box display={"flex"} m={1} flexDirection={"column"}>
              <Button onClick={loginHandler} variant="outlined">
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
