import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllPositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await axios.get("/positions   ");
      return await res.data.positions;
    },
  });
};
