import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllShootingCategories = (state: string) => {
  return useQuery({
    queryKey: ["shooting-categories", state],
    queryFn: async () => {
      const res = await axios.get(`/shooting-categories?state=${state}`);
      return await res.data.shootingCategories;
    },
  });
};
