import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../lib/axios/axiosInstance";

export const useNotiDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: number) => {
      return await axiosInstance.post(`/notifications/${contentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "notifications",
      ] as InvalidateQueryFilters);
    },
  });
};
