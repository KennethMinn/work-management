import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios/axiosInstance";

export const useGetAllDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axios.get("/departments");
      return await res.data.departments;
    },
  });
};
