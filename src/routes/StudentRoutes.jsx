import LogoLoader from "../components/LogoLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const StudentRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role);
  if (loading || roleLoading) {
    return <LogoLoader></LogoLoader>;
  }

  if (!role) {
    return <LogoLoader />;
  }

  if (role !== "student") {
    return <p>Access is forbidden</p>;
  }
  return children;
};

export default StudentRoutes;
