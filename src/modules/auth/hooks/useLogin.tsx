import { useMutation } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post("/admin/login", data);
      const { user, token } = await res.data;
      localStorage.setItem("token", token);
      setAuth(user);
      navigate("/dashboard");
    },
  });
};
