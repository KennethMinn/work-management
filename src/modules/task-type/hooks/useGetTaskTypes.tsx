import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetTaskTypes = (companyId: string) => {
  return useQuery({
    queryKey: ["task-types", companyId],
    queryFn: async () => {
      const res = await axios.get(`/task-types?company_id=${companyId}`);
      return await res.data.taskTypes;
    },
  });
};
