import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { Report } from "../types";

export const useGetReport = (id: number | undefined) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      const res = await axios.get(`/reports?id=${id}`);
      const report: Report = await res.data.report;
      return report;
    },
    enabled: !!id,
  });
};
