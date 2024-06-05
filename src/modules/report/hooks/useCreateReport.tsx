import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("/report-create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "employee-tasks",
      ] as InvalidateQueryFilters);
    },
  });
};
