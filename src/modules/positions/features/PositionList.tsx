import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { usePositionColumns } from "../hooks/usePositionColumns";
import { useGetAllPositions } from "../hooks/useGetAllPositions";
import CompanyCreateForm from "../components/PositionCreateForm";

const PositionList = () => {
  const columns = usePositionColumns();
  const { data: positions, isLoading } = useGetAllPositions();

  return (
    <Box>
      <CompanyCreateForm />
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={positions} />
      )}
    </Box>
  );
};

export default PositionList;
