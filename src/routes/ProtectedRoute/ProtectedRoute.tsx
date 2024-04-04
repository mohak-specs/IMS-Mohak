import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import HomeLayout from "../../components/HomeLayout";
import axios from "axios";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        toast.error(error.response.data.message || error.message, {
          id: "Unauthorized",
        });
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
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
  // If user is authenticated, render the protected content
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};

export default ProtectedRoute;
