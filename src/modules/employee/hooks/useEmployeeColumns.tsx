import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { EmployeeDataRow } from "../types";
import EmployeeEditForm from "../components/EmployeeEditForm";
import EmployeeDeleteForm from "../components/EmployeeDeleteForm";

export const useEmployeeColumns = () => {
  const employeeColumns: TableColumn<EmployeeDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name ?? "-",
      width: "160px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender ?? "-",
    },
    {
      name: "email",
      selector: (row) => row.email ?? "-",
    },
    {
      name: "phone",
      selector: (row) => row.phone ?? "-",
    },
    {
      name: "position",
      selector: (row) => row?.position?.name ?? "-",
    },
    {
      name: "Actions",
      cell: () => (
        <Flex align="center" gap={20}>
          <EmployeeEditForm />
          <EmployeeDeleteForm />
        </Flex>
      ),
    },
  ];

  return employeeColumns;
};
