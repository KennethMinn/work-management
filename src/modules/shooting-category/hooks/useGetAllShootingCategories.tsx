import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllShootingCategories = () => {
  return useQuery({
    queryKey: ["shooting-categories"],
    queryFn: async () => {
      const res = await axios.get("/shooting-categories");
      return await res.data.shootingCategories;
    },
  });
};
