import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
