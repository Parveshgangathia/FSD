import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ children, allowed }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowed.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default RoleRoute;
