import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { CompanyDataRow } from "../types";
import CompanyEditForm from "../components/CompanyEditForm";
import CompanyDeleteForm from "../components/CompanyDeleteForm";

export const useEmployeeColumns = () => {
  const companyColumns: TableColumn<CompanyDataRow>[] = [
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
          <CompanyEditForm id={row.id} />
          <CompanyDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return companyColumns;
};
