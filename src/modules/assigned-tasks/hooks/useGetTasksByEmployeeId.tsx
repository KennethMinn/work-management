import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetTasksByEmployeeId = (id: number | undefined) => {
  return useQuery({
    staleTime: 0, //always get fresh data
    queryKey: ["employee-tasks"],
    queryFn: async () => {
      const res = await axios.get(`/assigned-tasks/employee/${id}`);
      return await res.data.assignedTasks;
    },
  });
};
