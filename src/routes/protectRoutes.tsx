import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const store = useSelector((state: any) => state.auth.login.data);
  const token = store?.token;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
