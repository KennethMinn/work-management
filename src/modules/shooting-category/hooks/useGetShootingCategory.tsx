import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetShootingCategory = (id: number) => {
  return useQuery({
    queryKey: ["shooting-category", id],
    queryFn: async () => {
      const res = await axios.get(`/shooting-categories/${id}`);
      return await res.data.shootingCategory;
    },
    enabled: !!id,
  });
};
