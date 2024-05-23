import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetDepartment = (id: number) => {
  return useQuery({
    queryKey: ["department", id],
    queryFn: async () => {
      const res = await axios.get(`/departments/${id}`);
      return await res.data.department;
    },
    enabled: !!id,
  });
};
