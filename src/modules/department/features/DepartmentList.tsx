import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useDepartmentColumns } from "../hooks/useDepartmentColumns";
import { useGetAllDepartments } from "../hooks/useGetAllDepartments";
import CompanyCreateForm from "../components/DepartmentCreateForm";

const DepartmentList = () => {
  const columns = useDepartmentColumns();
  const { data: departments, isLoading } = useGetAllDepartments();

  return (
    <Box>
      <CompanyCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={departments} />
      )}
    </Box>
  );
};

export default DepartmentList;
