import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./protectRoutes";

const HomeScreen = lazy(() => import("../containers/screen/home/Home"));
const LoginScreen = lazy(() => import("../containers/screen/auth/Login"));
const RegisterScreen = lazy(() => import("../containers/screen/auth/Register"));

const AllRoutes = () => {
  return (
    <BrowserRouter>
      {/* Wrap the routes with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
