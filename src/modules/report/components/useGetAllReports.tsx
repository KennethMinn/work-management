import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axios.get("/reports");
      return await res.data.reports;
    },
  });
};
