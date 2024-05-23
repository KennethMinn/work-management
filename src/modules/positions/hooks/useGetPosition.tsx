import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetPosition = (id: number) => {
  return useQuery({
    queryKey: ["department", id],
    queryFn: async () => {
      const res = await axios.get(`/positions/${id}`);
      return await res.data.position;
    },
    enabled: !!id,
  });
};
