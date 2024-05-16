import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("/company-create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"] as InvalidateQueryFilters);
    },
  });
};
