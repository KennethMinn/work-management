import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (data: FormData) => {
      try {
        // Fetch CSRF token
        await axiosInstance.get("/sanctum/csrf-cookie");

        // Perform login request
        const res = await axiosInstance.post("/login", data);
        const { user, token } = await res.data;

        // Store token and set authenticated user
        localStorage.setItem("token", token);
        setAuth(user);

        // Redirect based on user role
        if (user?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard/assigned-tasks");
        }
      } catch (error) {
        // Handle errors here
        console.error("Login failed:", error);
        // You might want to handle errors in a better way
      }
    },
  });
};
