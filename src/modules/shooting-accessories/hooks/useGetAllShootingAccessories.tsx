import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllShootingAccessories = () => {
  return useQuery({
    queryKey: ["shooting-accessories"],
    queryFn: async () => {
      const res = await axios.get("/shooting-accessories");
      return await res.data.shootingAccessories;
    },
  });
};
