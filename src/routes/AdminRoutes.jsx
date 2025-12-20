import LogoLoader from "../components/LogoLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <LogoLoader></LogoLoader>;
  }

  if (role !== "admin") {
    return (
      <div>
        <p>Access is forbidden</p>
      </div>
    );
  }
  return children;
};

export default AdminRoute;
