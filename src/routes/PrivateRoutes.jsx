import { Navigate, useLocation } from "react-router";
import LogoLoader from "../components/LogoLoader";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();
  if (loading) {
    return <LogoLoader></LogoLoader>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
