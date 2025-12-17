import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
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
