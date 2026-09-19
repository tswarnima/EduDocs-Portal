import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../../api/auth";

function AdminProtectedRoute({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
