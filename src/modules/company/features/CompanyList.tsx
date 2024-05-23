import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useEmployeeColumns } from "../hooks/useCompanyColumns";
import { useGetAllCompanies } from "../hooks/useGetAllCompanies";
import CompanyCreateForm from "../components/CompanyCreateForm";

const CompanyList = () => {
  const columns = useEmployeeColumns();
  const { data: employees, isLoading } = useGetAllCompanies();

  return (
    <Box>
      <CompanyCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={employees} />
      )}
    </Box>
  );
};

export default CompanyList;
