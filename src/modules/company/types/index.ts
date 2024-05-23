import { z } from "zod";

export interface CompanyDataRow {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  company: string | null;
}

export const companyFormSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export type TCompanyFormSchema = z.infer<typeof companyFormSchema>;
