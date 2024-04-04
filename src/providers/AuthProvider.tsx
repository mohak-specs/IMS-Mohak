import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { Button } from "antd";
type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  useEffect(() => {
    try {
      if (token) {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded?.exp < currentTime) {
          throw new Error("Session expired. Please login again.");
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
      }
    } catch (err: any) {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      toast(
        (t) => (
          <span>
            {err.message}
            <Button
              onClick={() => {
                toast.dismiss(t.id);
                window.location.href = "/login";
              }}
              size="small"
            >
              Login
            </Button>
          </span>
        ),
        { id: "session-expired", duration: Infinity }
      );
    }
  }, [token]);
  const contextValue = useMemo(() => ({ token, setToken }), [token]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export { AuthContext };
export default AuthProvider;
