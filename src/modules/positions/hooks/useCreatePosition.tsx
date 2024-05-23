import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("/position-create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["positions"] as InvalidateQueryFilters);
    },
  });
};
