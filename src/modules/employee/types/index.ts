import { z } from "zod";

export interface Company {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  name: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: number;
  name: string;
  department_id: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeDataRow {
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
  email_verified_at: Date | null;
  created_at: string;
  updated_at: string;
  company: Company;
  department: Department;
  position: Position;
  imgURL: string;
}

export const employeeCreateFormSchema = z.object({
  // photo_path -> from comp
  name: z.string().min(1, "name is required"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
  phone: z.string().min(1, "phone is required"),
  nrc_number: z.string().min(1, "nrc is required"),
  gender: z.string().min(1, "gender is required"),
  role: z.string().min(1, "role is required"),
  company_id: z.string().min(1, "department is required"),
  department_id: z.string().min(1, "position is required"),
  position_id: z.string().min(1, "position is required"),
});

export type TEmployeeCreateFormSchema = z.infer<
  typeof employeeCreateFormSchema
>;

export const employeeUpdateFormSchema = z.object({
  // photo_path -> from comp
  name: z.string().min(1, "name is required"),
  email: z.string().email("invalid email"),
  password: z.string().optional(),
  phone: z.string().min(1, "phone is required"),
  nrc_number: z.string().min(1, "nrc is required"),
  gender: z.string().min(1, "gender is required"),
  role: z.string().min(1, "role is required"),
  company_id: z.string().min(1, "department is required"),
  department_id: z.string().min(1, "position is required"),
  position_id: z.string().min(1, "position is required"),
});

export type TEmployeeUpdateFormSchema = z.infer<
  typeof employeeUpdateFormSchema
>;
