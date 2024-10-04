import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "../containers/screen/home/Home";
import LoginScreen from "../containers/screen/auth/Login";
import RegisterScreen from "../containers/screen/auth/Register";
import ProtectedRoute from "./protectRoutes";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
