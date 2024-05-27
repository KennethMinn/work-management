import { z } from "zod";

export interface ProjectDataRow {
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
  customer: Customer;
  employee: Employee;
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

export interface Employee {
  id: number;
  name: string;
  company_id: number;
  position_id: number;
  email: string;
  role: string;
  phone: string;
  gender: string;
  nrc_number: string;
  department_id: number;
  photo_path: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  imgURL: string;
}

export const projectFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  customer_id: z.string().min(1, "customer is required"),
  description: z.string().min(1, "description is required"),
  value: z.string().min(1, "value is required"),
  contract_date: z
    .date()
    .refine((date) => !isNaN(date.getTime()), "Invalid date"),
  start_date: z.date().refine((date) => !isNaN(date.getTime()), "Invalid date"),
  end_date: z.date().refine((date) => !isNaN(date.getTime()), "Invalid date"),
  user_id: z.string().min(1, "user is required"),
});

export type TProjectFormSchema = z.infer<typeof projectFormSchema>;
