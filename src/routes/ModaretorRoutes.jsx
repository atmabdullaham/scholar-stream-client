import LogoLoader from "../components/LogoLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ModaretorRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role);
  if (loading || roleLoading) {
    return <LogoLoader></LogoLoader>;
  }

  if (role !== "moderator") {
    return (
      <div>
        <p>Access is forbidden</p>
      </div>
    );
  }
  return children;
};

export default ModaretorRoutes;
