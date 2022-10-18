import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  console.log("user", user);
  if (!user) {
    console.log("no user", user);
    return <Navigate to="/" />;
  }
  return children;
};
