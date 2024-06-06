import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/reports-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reports "] as InvalidateQueryFilters);
    },
  });
};
