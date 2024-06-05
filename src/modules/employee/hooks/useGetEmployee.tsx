import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { EmployeeDataRow } from "../types";

export const useGetEmployee = (
  id: number
): UseQueryResult<EmployeeDataRow | Error> => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axios.get(`/employees/${id}`);
      return await res.data.employee;
    },
    enabled: !!id,
  });
};
