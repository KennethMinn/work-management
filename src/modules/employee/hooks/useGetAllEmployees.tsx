import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axios.get("/employees");
      return await res.data.employees;
    },
  });
};
