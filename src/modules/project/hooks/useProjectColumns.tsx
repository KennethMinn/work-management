import { TableColumn } from "react-data-table-component";
import { Flex, Text } from "@mantine/core";
import { ProjectDataRow } from "../types";

import ProjectEditForm from "../components/ProjectEditForm";
import ProjectDeleteForm from "../components/ProjectDeleteForm";

export const useProjectColumns = () => {
  const projectColumns: TableColumn<ProjectDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "100px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "140px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer.name,
      width: "100px",
    },
    {
      name: "User",
      selector: (row) => row.employee.name,
      width: "150px",
    },
    {
      name: "Value",
      selector: (row) => row.value,
      width: "100px",
    },
    {
      name: "Contract Date",
      selector: (row) => row.contract_date,
      width: "130px",
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      width: "130px",
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      width: "130px",
    },
    {
      name: "Doc",
      cell: (row) => (
        <Text
          onClick={() => window.open(row.fileURL, "_blank")}
          style={{ textDecoration: "underline", cursor: "pointer" }}
          c="blue"
        >
          doc
        </Text>
      ),
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <ProjectEditForm id={row.id} />
          <ProjectDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return projectColumns;
};
