import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ModaretorRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role);
  if (loading || roleLoading) {
    return (
      <div>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
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
