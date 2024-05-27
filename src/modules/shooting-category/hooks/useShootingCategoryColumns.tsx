import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { ShootingCategoryDataRow } from "../types";
import ShootingCategoryEditForm from "../components/ShootingCategoryEditForm";
import ShootingCategoryDeleteForm from "../components/ShootingCategoryDeleteForm";

export const useShootingCategoryColumns = () => {
  const shootingCategoryColumns: TableColumn<ShootingCategoryDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "500px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <ShootingCategoryEditForm id={row.id} />
          <ShootingCategoryDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return shootingCategoryColumns;
};
