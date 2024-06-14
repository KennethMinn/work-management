import { useMutation } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.post("/admin/login", data);
      const { user, token } = await res.data;
      localStorage.setItem("token", token);
      setAuth(user);
      if (user?.role === "admin" || user?.role === "owner") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/assigned-tasks");
      }
    },
  });
};
