import { Box } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useEmployeeColumns } from "../hooks/useEmployeeColumns";
import { useGetAllEmployees } from "../hooks/useGetAllEmployees";
import EmployeeCreateForm from "../components/EmployeeCreateForm";

const EmployeeList = () => {
  const columns = useEmployeeColumns();
  const { data: employees, isLoading } = useGetAllEmployees();

  //if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box>
      <EmployeeCreateForm />
      {isLoading ? (
        <div>table</div>
      ) : (
        <DataTable columns={columns} data={employees} />
      )}
    </Box>
  );
};

export default EmployeeList;
