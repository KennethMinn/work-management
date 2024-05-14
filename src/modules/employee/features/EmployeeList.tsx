import { Box } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useEmployeeColumns } from "../hooks/useEmployeeColumns";

const data = [
  {
    id: 3,
    name: "Khin",
    company_id: 1,
    position_id: 1,
    email: "khin@gmail.com",
    role: "employee",
    phone: "093839423323223338",
    gender: "female",
    nrc_number: "7/pamana(n)839234",
    department_id: 1,
    photo_path: "65f7d1a32eaaa.jpg",
    email_verified_at: null,
    created_at: "2024-03-18T05:30:58.000000Z",
    updated_at: "2024-03-18T05:30:58.000000Z",
    company: {
      id: 1,
      name: "Beyond",
      created_at: "2024-03-18T05:28:40.000000Z",
      updated_at: "2024-03-18T05:28:40.000000Z",
    },
    department: {
      id: 1,
      name: "Developer",
      company_id: 1,
      created_at: "2024-03-18T05:29:45.000000Z",
      updated_at: "2024-03-18T05:29:45.000000Z",
    },
    position: {
      id: 1,
      name: "Graphic Designer",
      department_id: 1,
      created_at: "2024-03-18T05:30:33.000000Z",
      updated_at: "2024-03-18T05:30:33.000000Z",
    },
  },
];

const EmployeeList = () => {
  const columns = useEmployeeColumns();
  return (
    <Box>
      <DataTable columns={columns} data={data} />
    </Box>
  );
  DataTable;
};

export default EmployeeList;
