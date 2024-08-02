import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../lib/axios/axiosInstance";

export const useCloseNoti = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: number) => {
      return await axiosInstance.post(`/is_close/${contentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "notifications",
      ] as InvalidateQueryFilters);
    },
  });
};
