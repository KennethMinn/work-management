import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetProjectsByCustomerId = (customer_id?: string) => {
  return useQuery({
    queryKey: ["projects", customer_id],
    queryFn: async () => {
      const res = await axios.get(`/projects?customer_id=${customer_id}`);
      return await res.data.projects;
    },
  });
};
