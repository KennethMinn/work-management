import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/projects-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects "] as InvalidateQueryFilters);
    },
  });
};
