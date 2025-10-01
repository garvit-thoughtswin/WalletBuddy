import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import type { AuthContextType, IFormValues } from "../types/form";
import { login, signup } from "../services/authService";


export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext) as AuthContextType;

  const handleLogin = async (data: IFormValues) => {
    try {
      const res = await login(data);
      setToken(res.token);
      localStorage.setItem("token", res.token);
    } catch (err) {
      throw err;
    }
  };

  const handleSignup = async (data: IFormValues) => {
    try {
      const res = await signup(data);
      setToken(res.token);
      localStorage.setItem("token", res.token);
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return { handleLogin, handleSignup, handleLogout };
};