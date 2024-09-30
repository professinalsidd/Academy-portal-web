import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "../containers/screen/home/Home";
import LoginScreen from "../containers/screen/auth/Login";
import RegisterScreen from "../containers/screen/auth/Register";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Function to check if token is expired (optional, based on backend JWT)
const isTokenExpired = (token: string) => {
  if (!token) return true; // If token is not present, treat it as expired
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime; // Check expiration
  } catch (error) {
    return true; // If decoding fails, treat token as invalid
  }
};

const AllRoutes = () => {
  const store = useSelector((state: any) => state.auth.login);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = store?.token;
    // Check if token exists and is not expired
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [store]);

  return (
    <BrowserRouter>
      <Routes>
        {/* If user is authenticated, show HomeScreen; otherwise redirect to Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <HomeScreen /> : <Navigate to="/login" replace />
          }
        />
        {/* Login route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginScreen />
          }
        />
        {/* Register route */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterScreen />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
