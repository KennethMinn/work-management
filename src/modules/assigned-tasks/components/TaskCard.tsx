import { useSortable } from "@dnd-kit/sortable";
import { Card, Flex, Group, Text } from "@mantine/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../calendar/types";
import { IconDetails, IconList, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  cursorStyle: string;
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  cursorStyle,
  setActiveTask,
  setOpen,
  setDetailOpen,
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

  const onHandleDetail = () => {
    setActiveTask(task);
    setDetailOpen(true);
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
          <IconDetails
            size={22}
            onClick={onHandleDetail}
            style={{ color: "#4361ee", cursor: "pointer" }}
          />
          {task.status !== "done" && (
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
