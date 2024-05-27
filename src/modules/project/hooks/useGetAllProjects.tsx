import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/projects");
      return await res.data.projects;
    },
  });
};
