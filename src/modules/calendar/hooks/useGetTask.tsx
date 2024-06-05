import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { Task } from "../types";

export const useGetTask = (id: number): UseQueryResult<Task, Error> => {
  return useQuery<Task, Error>({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axios.get(`/assigned-tasks/${id}`);
      return res.data.assignedTask;
    },
    enabled: !!id,
  });
};
