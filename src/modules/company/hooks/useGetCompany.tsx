import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetCompany = (id: number) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const res = await axios.get(`/companies/${id}`);
      return await res.data.company;
    },
    enabled: !!id,
  });
};
