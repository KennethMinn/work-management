import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdateTask = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/assigned-tasks/update/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"] as InvalidateQueryFilters);
    },
  });
};
