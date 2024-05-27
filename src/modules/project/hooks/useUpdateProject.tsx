import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdateProject = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/projects-update/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"] as InvalidateQueryFilters);
    },
  });
};
