import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { DepartmentDataRow } from "../types";
import DepartmentEditForm from "../components/DepartmentEditForm";
import DepartmentDeleteForm from "../components/DepartmentDeleteForm";

export const useDepartmentColumns = () => {
  const departmentColumns: TableColumn<DepartmentDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "100px",
    },
    {
      name: "Company",
      selector: (row) => row.company.name,
      width: "450px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <DepartmentEditForm id={row.id} />
          <DepartmentDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return departmentColumns;
};
