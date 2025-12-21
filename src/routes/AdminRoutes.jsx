import LogoLoader from "../components/LogoLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <LogoLoader></LogoLoader>;
  }

  if (!role) {
    return <LogoLoader />;
  }

  if (role !== "admin") {
    return <p>Access is forbidden</p>;
  }
  return children;
};

export default AdminRoute;
