import { Box } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useTasksColumns } from "../hooks/useTaskColumns";
import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import TaskEditForm from "../components/TaskEditForm";

const TaskList = () => {
  const navigate = useNavigate();
  const { state: tasks } = useLocation();
  const { taskColumns, task, open, setOpen } = useTasksColumns();

  return (
    <Box>
      <Box onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <IconArrowLeft />
      </Box>
      <DataTable columns={taskColumns} data={tasks} />
      {open && task && (
        <TaskEditForm
          assignedTask={task}
          close={() => setOpen(false)}
          opened={open}
        />
      )}
    </Box>
  );
};

export default TaskList;
