import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetCustomer = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const res = await axios.get(`/customers/${id}`);
      return await res.data.customer;
    },
    enabled: !!id,
  });
};
