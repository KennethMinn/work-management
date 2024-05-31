import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/assigned-tasks/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"] as InvalidateQueryFilters);
    },
  });
};
