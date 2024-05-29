import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("/assigned-tasks-create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"] as InvalidateQueryFilters);
    },
  });
};
