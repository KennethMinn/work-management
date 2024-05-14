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
}

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
