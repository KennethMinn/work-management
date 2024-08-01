import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios/axiosInstance";
import { Notification } from "../types/noti";

export const useGetNotifications = (date: string | null, time?: string) => {
  return useQuery({
    staleTime: 0,
    queryKey: ["notifications", date, time],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/notifications?date=${date}&time=${time}`
      );
      return res.data.notifications as Notification[];
    },
  });
};
