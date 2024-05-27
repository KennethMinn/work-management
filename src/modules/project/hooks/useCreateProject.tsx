import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("/project-create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"] as InvalidateQueryFilters);
    },
  });
};
