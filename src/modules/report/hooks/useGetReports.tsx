import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";
import { Report } from "../types";

export const useGetReports = (
  task_id: string | null,
  from_date: string | null,
  to_date: string | null
) => {
  return useQuery({
    queryKey: ["reports", task_id, from_date, to_date],
    queryFn: async () => {
      const res = await axios.get(
        `/reports?task_id=${task_id}&from_date=${from_date}&to_date=${to_date}`
      );
      const reports: Report[] = await res.data.reports;
      return reports;
    },
  });
};
