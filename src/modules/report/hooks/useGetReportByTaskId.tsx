import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { Report } from "../types";

export const useGetReportByTaskId = (id: number | undefined) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      const res = await axios.get(`/reports/task/${id}`);
      const report: Report = await res.data.reports;
      return report;
    },
    enabled: !!id,
  });
};
