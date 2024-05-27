import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetShootingAccessory = (id: number) => {
  return useQuery({
    queryKey: ["shooting-accessory", id],
    queryFn: async () => {
      const res = await axios.get(`/shooting-accessory/${id}`);
      return await res.data.shootingAccessory;
    },
    enabled: !!id,
  });
};
