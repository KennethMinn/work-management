import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { PositionDataRow } from "../types";
import PositionEditForm from "../components/PositionEditForm";
import PositionDeleteForm from "../components/PositionDeleteForm";

export const usePositionColumns = () => {
  const positionColumns: TableColumn<PositionDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "190px",
    },
    {
      name: "Department",
      selector: (row) => row.department.name,
      width: "450px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <PositionEditForm id={row.id} />
          <PositionDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return positionColumns;
};
