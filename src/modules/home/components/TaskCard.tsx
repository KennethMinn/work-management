import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@mantine/core";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../calendar/types";

interface TaskCardProps {
  task: Task;
  cursorStyle: string;
}

const TaskCard: FC<TaskCardProps> = ({ task, cursorStyle }) => {
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

  return (
    <Card
      ref={setNodeRef}
      radius="md"
      withBorder
      style={{ cursor: cursorStyle, ...style }}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </Card>
  );
};

export default TaskCard;
