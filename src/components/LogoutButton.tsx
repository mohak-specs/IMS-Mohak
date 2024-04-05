import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useUserStore from "../store/useUserStore";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { user, destroy } = useUserStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    destroy();
    navigate("/login", { replace: true });
    toast.success(`${user?.name} logged out successfully`, { id: "logout" });
  };

  return (
    <a style={{ width: "100%" }} onClick={handleLogout}>
      Logout
    </a>
  );
};

export default LogoutButton;
