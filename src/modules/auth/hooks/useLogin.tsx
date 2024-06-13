import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import axios from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.get(
        "http://workmanagementbackend.kwintechnologies.com/sanctum/csrf-cookie"
      );

      const res = await axiosInstance.post("/admin/login", data);
      const { user, token } = await res.data;
      localStorage.setItem("token", token);
      setAuth(user);
      if (user?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/assigned-tasks");
      }
    },
  });
};
