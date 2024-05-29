import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

const useGetShootingAccessoriesByCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["shooting-accessories", categoryId],
    queryFn: async () => {
      const res = await axios.get(`/shooting-accessories/${categoryId}`);
      return await res.data.shootingAccessory;
    },
    enabled: !!categoryId,
  });
};

export default useGetShootingAccessoriesByCategoryId;
