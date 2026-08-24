import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== role) {
    return <Navigate to="/jobs" />;
  }

  return children;
};

export default RoleRoute;
