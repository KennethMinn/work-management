import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("/customer-create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"] as InvalidateQueryFilters);
    },
  });
};
