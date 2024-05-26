import { TableColumn } from "react-data-table-component";
import { Avatar, Flex } from "@mantine/core";
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
      name: "Avatar",
      cell: (row) => <Avatar src={row.imgURL} />,
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
      name: "Email",
      selector: (row) => row.email ?? "-",
    },
    {
      name: "Phone",
      selector: (row) => row.phone ?? "-",
    },
    {
      name: "Position",
      selector: (row) => row?.position?.name ?? "-",
    },
    {
      name: "Role",
      selector: (row) => row.role ?? "-",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <EmployeeEditForm id={row.id} />
          <EmployeeDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return employeeColumns;
};
