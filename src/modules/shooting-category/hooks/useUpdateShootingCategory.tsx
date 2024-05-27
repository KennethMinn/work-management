import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdateShootingCategory = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/shooting-categories/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "shooting-categories",
      ] as InvalidateQueryFilters);
    },
  });
};
