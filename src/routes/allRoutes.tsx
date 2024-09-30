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
    <Routes>
      {/* Redirect to login if not authenticated, else show Home */}
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
  );
};

// Higher-level component to wrap AllRoutes with BrowserRouter
const App = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default App;
