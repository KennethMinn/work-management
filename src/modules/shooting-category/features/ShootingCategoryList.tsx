import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useGetAllShootingCategories } from "../hooks/useGetAllShootingCategories";
import { useShootingCategoryColumns } from "../hooks/useShootingCategoryColumns";
import ShootingCategoryCreateForm from "../components/ShootingCategoryCreateForm";
import { ShootingCategoryDataRow } from "../types";

const ShootingCategoryList = () => {
  const columns = useShootingCategoryColumns();
  const { data: shootingCategories, isLoading } = useGetAllShootingCategories();

  const visiblShootingCategories = shootingCategories?.filter(
    (shootingCategory: ShootingCategoryDataRow) =>
      shootingCategory.status === null
  );

  return (
    <Box>
      <ShootingCategoryCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={visiblShootingCategories} />
      )}
    </Box>
  );
};

export default ShootingCategoryList;
