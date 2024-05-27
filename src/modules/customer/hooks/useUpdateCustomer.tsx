import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdateCustomer = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/customers-update/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"] as InvalidateQueryFilters);
    },
  });
};
