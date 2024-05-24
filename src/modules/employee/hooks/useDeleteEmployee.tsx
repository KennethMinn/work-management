import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/employees-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees "] as InvalidateQueryFilters);
    },
  });
};
