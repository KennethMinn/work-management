import { z } from "zod";
import { Task } from "../../calendar/types";
import { Employee } from "../../project/types";

export interface Report {
  id: number;
  project_id: number;
  customer_id: number;
  user_id: number;
  assigned_task_id: number;
  status: string;
  progress: number;
  progress_description: string;
  report_date: string;
  report_time: string;
  attachment_path: string;
  photo_path: string;
  video_path: string;
  created_at: string;
  updated_at: string;
  imageUrl: string;
  videoUrl: string;
  documentUrl: string;
  project: Project;
  customer: Customer;
  user: Employee;
  task: Task;
}

export interface Project {
  id: number;
  customer_id: number;
  name: string;
  description: string;
  value: number;
  contract_date: string;
  start_date: string;
  end_date: string;
  document: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  fileURL: string;
}

export interface Customer {
  id: number;
  name: string;
  business_type: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  social_link: string;
  created_at: string;
  updated_at: string;
}

export interface ReportDataRow {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  company: string | null;
}

export const reportFormSchema = z.object({
  // attachment_path
  // photo_path
  // video_path
  // user_id
  project_id: z.string().min(1, "project is required"),
  customer_id: z.string().min(1, "customer is required"),
  assigned_task_id: z.string().min(1, "assigned task is required"),
  progress: z.number().min(1, "progress is required"),
  progress_description: z.string().min(1, "description is required"),
  report_date: z.date().min(new Date("2022-01-01"), "report date is required"),
  report_time: z.string().min(1, "time is required"),
  status: z.string().min(1, "status is required"),
});

export type TReportFormSchema = z.infer<typeof reportFormSchema>;
