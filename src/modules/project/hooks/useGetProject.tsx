import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await axios.get(`/projects/${id}`);
      return await res.data.project;
    },
    enabled: !!id,
  });
};
