import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { EmployeeDataRow } from "../types";
import EmployeeEditForm from "../components/EmployeeEditForm";
import EmployeeDeleteForm from "../components/EmployeeDeleteForm";

export const useEmployeeColumns = () => {
  const employeeColumns: TableColumn<EmployeeDataRow>[] = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      minWidth: "200px",
    },
    {
      name: "Age",
      selector: (row) => row.age,
      minWidth: "120px",
    },
    {
      name: "email",
      selector: (row) => row.email,
      minWidth: "120px",
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
