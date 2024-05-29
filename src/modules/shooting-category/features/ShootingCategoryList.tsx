import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useGetAllShootingCategories } from "../hooks/useGetAllShootingCategories";
import { useShootingCategoryColumns } from "../hooks/useShootingCategoryColumns";
import ShootingCategoryCreateForm from "../components/ShootingCategoryCreateForm";

const ShootingCategoryList = () => {
  const columns = useShootingCategoryColumns();
  const { data: shootingCategories, isLoading } =
    useGetAllShootingCategories("visible");

  return (
    <Box>
      <ShootingCategoryCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={shootingCategories} />
      )}
    </Box>
  );
};

export default ShootingCategoryList;
