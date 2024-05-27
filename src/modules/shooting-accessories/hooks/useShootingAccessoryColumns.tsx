import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { ShootingAccessoriesDataRow } from "../types";
import ShootingAccessoryEditForm from "../components/ShootingAccessoryEditForm";
import ShootingAccessoryDeleteForm from "../components/ShootingAccessoryDeleteForm";

export const useShootingAccessoryColumns = () => {
  const shootingAccessoryColumns: TableColumn<ShootingAccessoriesDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "140px",
    },
    {
      name: "Shooting Category",
      selector: (row) => row.shooting_category.name,
      width: "500px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <ShootingAccessoryEditForm id={row.id} />
          <ShootingAccessoryDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return shootingAccessoryColumns;
};
