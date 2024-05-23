import { z } from "zod";

export interface Company {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentDataRow {
  id: number;
  name: string;
  company_id: number;
  created_at: string;
  updated_at: string;
  company: Company;
}

export const departmentFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  company_id: z.string().min(1, "company is required"),
});

export type TDepartmentFormSchema = z.infer<typeof departmentFormSchema>;
