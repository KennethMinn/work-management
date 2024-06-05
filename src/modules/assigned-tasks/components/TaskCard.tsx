import { useSortable } from "@dnd-kit/sortable";
import { Card, Flex, Group, Text } from "@mantine/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../calendar/types";
import { IconDetails, IconEdit, IconPlus } from "@tabler/icons-react";

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
    //task detail loginc
  };

  const onHandleReportCreate = () => {
    setActiveTask(task);
    setOpen(true);
  };

  const onHandleReportEdit = () => {
    setActiveTask(task);
    setEditOpen(true);
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
          {task.status === "pending" && (
            <IconPlus
              size={22}
              onClick={onHandleReportCreate}
              style={{ color: "#4361ee", cursor: "pointer" }}
            />
          )}
          {task.status === "inProgress" && (
            <IconEdit
              size={22}
              onClick={onHandleReportEdit}
              style={{ color: "#4361ee", cursor: "pointer" }}
            />
          )}
        </Group>
      </Flex>
    </Card>
  );
};

export default TaskCard;
