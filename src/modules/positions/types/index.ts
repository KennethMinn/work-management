import { z } from "zod";

export interface Department {
  id: number;
  name: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface PositionDataRow {
  id: number;
  name: string;
  department_id: number;
  created_at: string;
  updated_at: string;
  department: Department;
}

export const positionFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  department_id: z.string().min(1, "department is required"),
});

export type TPositionFormSchema = z.infer<typeof positionFormSchema>;
