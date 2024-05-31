import { Box, Text } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useTasksColumns } from "../hooks/useTaskColumns";
import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

const TaskList = () => {
  const navigate = useNavigate();
  const { state: tasks } = useLocation();
  const columns = useTasksColumns();

  return (
    <Box>
      <Box onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <IconArrowLeft />
      </Box>
      {!tasks ? (
        <Text>loading...</Text>
      ) : (
        <DataTable columns={columns} data={tasks} />
      )}
    </Box>
  );
};

export default TaskList;
