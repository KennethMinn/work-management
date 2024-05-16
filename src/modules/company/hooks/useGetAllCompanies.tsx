import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axios.get("/companies");
      return await res.data.companies;
    },
  });
};
