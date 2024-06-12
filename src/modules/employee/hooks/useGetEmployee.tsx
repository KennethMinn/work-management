import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetEmployee = (id: number) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axios.get(`/employees/${id}`);
      return await res.data.employee;
    },
    enabled: !!id,
  });
};
