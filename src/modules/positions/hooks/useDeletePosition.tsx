import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/positions-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["positions "] as InvalidateQueryFilters);
    },
  });
};
