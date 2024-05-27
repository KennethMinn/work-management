import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useUpdateShootingAccessory = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`/shooting-accessories/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "shooting-accessories",
      ] as InvalidateQueryFilters);
    },
  });
};
