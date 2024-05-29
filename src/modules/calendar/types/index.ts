export interface MyEvent {
  title: string;
  start: Date;
  end: Date;
}

import { z } from "zod";

export interface Task {
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
  customer: Customer;
  project: Project;
  user: User;
  design: string[];
  start?: Date;
  end?: Date;
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

export interface User {
  id: number;
  name: string;
  company_id: number;
  position_id: number;
  email: string;
  role: string;
  phone: string;
  gender: string;
  nrc_number: string;
  department_id: string;
  photo_path: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  imgURL: string;
}

export const taskFormSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),

  start_date: z.date().min(new Date("2022-01-01"), "date is required"),
  end_date: z.date().min(new Date("2022-01-01"), "date is required"),
  start_time: z.string().min(1, "start time is required"),
  end_time: z.string().min(1, "end time is required"),
  customer_id: z.string().min(1, "customer is required"),
  project_id: z.string().min(1, "project is required"),
  user_id: z.string().min(1, "user is required"),
  meeting_link: z.string().min(1, "meeting link is required"),
  location: z.string().min(1, "location is required"),

  //Graphic Design
  //reference_photo -> from comp
  brand: z.string().min(1, "brand is required"),
  type_of_media: z.string().min(1, "media type is required"),
  designer_id: z.string().min(1, "designer is required"),
  content_writer_id: z.string().min(1, "content_writer is required"),
  visual_copy: z.string().min(1, "visual copy is required"),
  headline: z.string().min(1, "headline is required"),
  deadline: z.date().min(new Date("2022-01-01"), "date is required"),
  body: z.string().min(1, "body is required"),
  objective: z.string().min(1, "objective is required"),
  important_info: z.string().min(1, "important_info is required"),
  taste_style: z.string().min(1, "taste style info is required"),
  visual_format: z.string().min(1, "visual format is required"),
  aspect_ratio: z.string().min(1, "aspect_ratio is required"),
  width: z.string().min(1, "width is required"),
  height: z.string().min(1, "height is required"),
  resolution: z.string().min(1, "resolution is required"),
  reference: z.string().min(1, "reference is required"),

  //shooting
  //document file -> from comp
  // duration: z.string().min(1, "duration is required"),
  // shooting_location: z.string().min(1, "shooting_location is required"),
  // type: z.string().min(1, "type  is required"),
  // type_detail: z.string().min(1, "type detail  is required"),
  // script_detail: z.string().min(1, "script detail  is required"),
  // scene_number: z.string().min(1, "scene number  is required"),
  // contact_name: z.string().min(1, "contact name  is required"),
  // contact_phone: z.string().min(1, "contact phone  is required"),
  // client: z.string().min(1, "client is required"),
  // date: z.date().min(new Date("2022-01-01"), "date is required"),
  // video_shooting_project: z
  //   .string()
  //   .min(1, "video shooting project is required"),
  // photo_shooting_project: z
  //   .string()
  //   .min(1, "photo shooting project is required"),
  // arrive_office_on_time: z.string().min(1, "time is required"),
  // transportation_charge: z.string().min(1, "transportation charge is required"),
  // out_time: z.string().min(1, "out time is required"),
  // in_time: z.string().min(1, "in time is required"),
  // crew_list: z.array(z.string()).min(1, "crew list is required"),
  // project_details: z.string().min(1, "project detail is required"),
});

export type TTaskFormSchema = z.infer<typeof taskFormSchema>;
