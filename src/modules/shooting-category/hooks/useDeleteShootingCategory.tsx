import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteShootingCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/shooting-categories/${id}/soft-delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "shooting-categories",
      ] as InvalidateQueryFilters);
    },
  });
};
