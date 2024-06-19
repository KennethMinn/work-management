import { useSortable } from "@dnd-kit/sortable";
import { Card, Flex, Group, Text } from "@mantine/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../calendar/types";
import { IconEdit, IconList, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  cursorStyle: string;
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  cursorStyle,
  setActiveTask,
  setOpen,
  setEditOpen,
}) => {
  const navigate = useNavigate();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const onHandleEdit = () => {
    setActiveTask(task);
    setEditOpen(true);
  };

  const onHandleReportCreate = () => {
    setActiveTask(task);
    setOpen(true);
  };

  const onHandleReportList = () => {
    navigate("/dashboard/report-list", { state: task.id });
  };

  return (
    <Card
      ref={setNodeRef}
      radius={7}
      withBorder
      style={{ cursor: cursorStyle, ...style }}
      {...attributes}
      {...listeners}
    >
      <Flex justify="space-between">
        <Text>{task.title}</Text>
        <Group gap={8}>
          <IconEdit
            size={22}
            onClick={onHandleEdit}
            style={{ color: "#4361ee", cursor: "pointer" }}
          />
          {task.status !== "done" && task.status !== "pending" && (
            <IconPlus
              size={22}
              onClick={onHandleReportCreate}
              style={{ color: "#4361ee", cursor: "pointer" }}
            />
          )}
          <IconList
            size={22}
            onClick={onHandleReportList}
            style={{ color: "#4361ee", cursor: "pointer" }}
          />
        </Group>
      </Flex>
    </Card>
  );
};

export default TaskCard;
