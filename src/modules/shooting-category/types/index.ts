import { z } from "zod";

export interface ShootingCategoryDataRow {
  id: number;
  name: string;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export const shootingCategoryFormSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export type TShootingCategoryFormSchema = z.infer<
  typeof shootingCategoryFormSchema
>;
