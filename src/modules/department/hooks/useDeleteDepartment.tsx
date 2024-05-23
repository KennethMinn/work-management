import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/departments-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["departments "] as InvalidateQueryFilters);
    },
  });
};
