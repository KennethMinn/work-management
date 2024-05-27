import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useGetAllShootingAccessories } from "../hooks/useGetAllShootingAccessories";
import CompanyCreateForm from "../components/ShootingAccessoryCreateForm";
import { useShootingAccessoryColumns } from "../hooks/useShootingAccessoryColumns";

const ShootingAccessoryList = () => {
  const columns = useShootingAccessoryColumns();
  const { data: shootingAccessories, isLoading } =
    useGetAllShootingAccessories();

  return (
    <Box>
      <CompanyCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={shootingAccessories} />
      )}
    </Box>
  );
};

export default ShootingAccessoryList;
