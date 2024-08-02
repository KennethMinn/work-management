import { ContentManagementData } from "../../modules/calendar/types";

export interface Notification {
  id: number;
  customer_id: number;
  project_id: number;
  title: string;
  description: string;
  user_id: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  location: string;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;
  is_done: number;
  contentManagement: ContentManagementData;
}
