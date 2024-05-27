import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useCustomerColumns } from "../hooks/useCustomerColumns";
import { useGetAllCustomers } from "../hooks/useGetAllCustomers";
import CompanyCreateForm from "../components/CustomerCreateForm";

const CustomerList = () => {
  const columns = useCustomerColumns();
  const { data: customers, isLoading } = useGetAllCustomers();

  return (
    <Box>
      <CompanyCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={customers} />
      )}
    </Box>
  );
};

export default CustomerList;
