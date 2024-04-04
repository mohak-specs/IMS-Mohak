import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import HomeLayout from "../../components/HomeLayout";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ callbackPath: window.location.pathname }}
        replace
      />
    );
  }
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};

export default ProtectedRoute;
