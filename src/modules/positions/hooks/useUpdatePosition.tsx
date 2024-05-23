import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdatePosition = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/positions-update/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["positions"] as InvalidateQueryFilters);
    },
  });
};
