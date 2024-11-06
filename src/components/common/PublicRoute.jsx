import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to dashboard if authenticated
  }

  return children; // Render the child component if not authenticated
};

export default PublicRoute;
