import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/assigned-tasks");
      return await res.data.assignedTasks;
    },
  });
};
