import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/companies-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"] as InvalidateQueryFilters);
    },
  });
};
