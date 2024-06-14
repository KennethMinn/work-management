import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllEmployees = (company_id = "") => {
  return useQuery({
    queryKey: ["employees", company_id],
    queryFn: async () => {
      const res = await axios.get(`/employees?company_id=${company_id}`);
      return await res.data.employees;
    },
  });
};
