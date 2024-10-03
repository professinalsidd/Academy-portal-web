import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "../containers/screen/home/Home";
import LoginScreen from "../containers/screen/auth/Login";
import RegisterScreen from "../containers/screen/auth/Register";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AllRoutes = () => {
  const store = useSelector((state: any) => state.auth.login);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = store?.token;
    // Check if token exists and is valid
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [store]);

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
