import { TableColumn } from "react-data-table-component";
import { Badge, Flex } from "@mantine/core";

import { Task } from "../types";
import TaskDeleteForm from "../components/TaskDeleteForm";

export const useTasksColumns = () => {
  const taskColumns: TableColumn<Task>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "200px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer.name,
      width: "120px",
    },
    {
      name: "Employee",
      selector: (row) => row.user.name,
      width: "120px",
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
      name: "Start Time",
      selector: (row) => row.start_time,
      width: "100px",
    },
    {
      name: "End Time",
      selector: (row) => row.end_time,
      width: "100px",
    },
    {
      name: "Status",
      width: "130px",
      cell: (row) => (
        <Badge
          color={
            row.status === "pending"
              ? "red"
              : row.status === "inProgress"
              ? "yellow"
              : "blue"
          }
          h={25}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          {/* <CompanyEditForm id={row.id} /> */}
          <TaskDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return taskColumns;
};
