import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axios.get("/customers");
      return await res.data.customers;
    },
  });
};
