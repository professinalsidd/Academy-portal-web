import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../containers/screen/home/Home";
import LoginScreen from "../containers/screen/auth/Login";
import RegisterScreen from "../containers/screen/auth/Register";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
