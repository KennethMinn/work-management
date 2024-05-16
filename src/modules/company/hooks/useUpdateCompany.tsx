import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdateCompany = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/companies-update/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"] as InvalidateQueryFilters);
    },
  });
};
