import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role')?.trim().toLowerCase();

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== role) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/jobs'} replace />;
  }

  return children;
};

export default RoleRoute;
