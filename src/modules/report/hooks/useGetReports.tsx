import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { Report } from "../types";

export const useGetReports = (role: string) => {
  return useQuery({
    queryKey: ["reports", role],
    queryFn: async () => {
      const res = await axios.get(`/reports?role=${role}`);
      const reports: Report[] = await res.data.reports;
      return reports;
    },
  });
};
