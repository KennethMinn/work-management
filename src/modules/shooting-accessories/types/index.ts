import { z } from "zod";

export interface ShootingAccessoriesDataRow {
  id: number;
  name: string;
  shooting_category_id: number;
  created_at: string;
  updated_at: string;
  shooting_category: ShootingCategory;
}

export interface ShootingCategory {
  id: number;
  name: string;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export const shootingAccessoryFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  shooting_category_id: z.string().min(1, "shooting category is required"),
});

export type TShootingAccessoryFormSchema = z.infer<
  typeof shootingAccessoryFormSchema
>;
