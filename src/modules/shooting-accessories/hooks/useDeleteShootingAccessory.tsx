import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteShootingAccessory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/shooting-accessories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "shooting-accessories",
      ] as InvalidateQueryFilters);
    },
  });
};
