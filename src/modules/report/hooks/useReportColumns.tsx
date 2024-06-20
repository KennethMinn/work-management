import { TableColumn } from "react-data-table-component";
import { Badge, Flex } from "@mantine/core";
import ReportEditForm from "../components/ReportEditForm";
import { Report } from "../types";
import ReportDeleteForm from "../components/ReportDeleteForm";
import { getTaskColor } from "../../assigned-tasks/utils";

export const useReportColumns = () => {
  const reportColumns: TableColumn<Report>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "70px",
    },
    {
      name: "Task",
      selector: (row) => row.task.title,
      width: "130px",
    },
    {
      name: "Project",
      selector: (row) => row.project.name,
      width: "130px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer.name,
      width: "130px",
    },
    {
      name: "Employee",
      selector: (row) => row.user.name,
      width: "130px",
    },
    {
      name: "Progress",
      selector: (row) => row.progress + "%",
      width: "100px",
    },
    {
      name: "Report Date",
      selector: (row) => row.report_date,
      width: "150px",
    },
    {
      name: "Report Time",
      selector: (row) => row.report_time,
      width: "130px",
    },
    {
      name: "Status",
      width: "130px",
      cell: (row) => (
        <Badge color={getTaskColor(row.status)} h={25}>
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <ReportEditForm id={row.id} />
          <ReportDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return reportColumns;
};
