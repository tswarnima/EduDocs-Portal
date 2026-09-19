import { Navigate, useLocation } from "react-router-dom";
import { isStudentLoggedIn } from "../../api/auth";

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isStudentLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
