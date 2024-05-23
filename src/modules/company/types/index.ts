export interface CompanyDataRow {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  company: string | null;
}

export interface CompanyCreateFormValues {
  name: string;
}

export interface CompanyUpdateFormValues {
  name: string;
}
