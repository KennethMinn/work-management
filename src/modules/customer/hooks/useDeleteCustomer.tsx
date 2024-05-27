import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/customers-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"] as InvalidateQueryFilters);
    },
  });
};
