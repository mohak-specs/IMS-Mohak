import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import useLoadingStore from "../../store/useLoadingStore";
import { useShallow } from "zustand/react/shallow";
import HomeLayout from "../../components/HomeLayout";
import Loader from "../../components/Loader";

const ProtectedRoute = () => {
  const { token } = useAuth();
  // If user is not authenticated, redirect to login page
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ callbackPath: window.location.pathname }}
        replace
      />
    );
  }
  const { isLoading } = useLoadingStore(
    useShallow((state) => ({ isLoading: state.isLoading }))
  );
  // If user is authenticated, render the protected content
  return (
    <>
      <Loader isLoading={isLoading} />
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    </>
  );
};

export default ProtectedRoute;
