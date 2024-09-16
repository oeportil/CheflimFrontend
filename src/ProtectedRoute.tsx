import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Para proteger la privacidad de las rutas
  const userSession = localStorage.getItem("userSession");

  if (userSession) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
