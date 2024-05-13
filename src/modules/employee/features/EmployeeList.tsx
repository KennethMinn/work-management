import { Box } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useEmployeeColumns } from "../hooks/useEmployeeColumns";

const data = [
  {
    no: 1,
    name: "mtk",
    age: 18,
    email: "mtk@gmail.com",
    position: "React Developer",
  },
  {
    no: 2,
    name: "st",
    age: 19,
    email: "st@gmail.com",
    position: "React Developer",
  },
  {
    no: 3,
    name: "su yin",
    age: 26,
    email: "suyin@gmail.com",
    position: "Java Developer",
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
