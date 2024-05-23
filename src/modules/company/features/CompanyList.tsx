import { Box } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useEmployeeColumns } from "../hooks/useCompanyColumns";
import { useGetAllCompanies } from "../hooks/useGetAllCompanies";
import CompanyCreateForm from "../components/CompanyCreateForm";

const CompanyList = () => {
  const columns = useEmployeeColumns();
  const { data: employees, isLoading } = useGetAllCompanies();

  //if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box>
      <CompanyCreateForm />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <DataTable columns={columns} data={employees} />
      )}
    </Box>
  );
};

export default CompanyList;
