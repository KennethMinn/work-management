import { z } from "zod";

export interface CustomerDataRow {
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

export const customerFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  business_type: z.string().min(1, "business type is required"),
  contact_person: z.string().min(1, "contact person is required"),
  phone: z.string().min(1, "phone is required"),
  email: z.string().min(1, "email is required"),
  address: z.string().min(1, "address is required"),
  social_link: z.string().min(1, "social link is required"),
});

export type TCustomerFormSchema = z.infer<typeof customerFormSchema>;
