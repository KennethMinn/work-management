import { Box, Flex, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useReportColumns } from "../hooks/useReportColumns";
import { useGetReports } from "../hooks/useGetReports";
import { useLocation } from "react-router-dom";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconCalendar, IconRefresh } from "@tabler/icons-react";
import dayjs from "dayjs";

const ReportList = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const { state: taskId } = useLocation();
  const columns = useReportColumns();
  const { data: reports = [], isLoading } = useGetReports(
    taskId,
    fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
    toDate ? dayjs(toDate).format("YYYY-MM-DD") : null
  );

  const onRefresh = () => {
    setFromDate(null);
    setToDate(null);
  };

  return (
    <Box>
      <Flex align="center" gap={10} mb={10}>
        <DatePickerInput
          w={200}
          value={fromDate}
          onChange={(date) => setFromDate(date)}
          leftSection={<IconCalendar />}
          leftSectionPointerEvents="none"
          placeholder="From"
        />
        <DatePickerInput
          w={200}
          value={toDate}
          onChange={(date) => setToDate(date)}
          leftSection={<IconCalendar />}
          leftSectionPointerEvents="none"
          placeholder="To"
        />

        <IconRefresh
          onClick={onRefresh}
          size={30}
          style={{ color: "#868e96", cursor: "pointer" }}
        />
      </Flex>
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={reports} />
      )}
    </Box>
  );
};

export default ReportList;
