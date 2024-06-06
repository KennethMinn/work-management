import { useAuth } from "../../../hooks/auth/useAuth";
import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { columns, getTaskColor } from "../utils";
import { Box, Card, Center, Grid, Stack, Text } from "@mantine/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "../components/TaskCard";
import { useGetTasksByEmployeeId } from "../hooks/useGetTasksByEmployeeId";
import { Task } from "../../calendar/types";
import { Droppable } from "../components/Droppable";
import ReportCreateForm from "../../report/components/ReportCreateForm";
import ReportEditForm from "../../report/components/ReportEditForm";

const AssignedTaskList = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { data: assignedTasks, isLoading } = useGetTasksByEmployeeId(user?.id);
  const [tasks, setTasks] = useState<Task[]>(assignedTasks || []);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [cursorStyle, setCursorStyle] = useState("grab");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, //we have to move 10px to start the drag event
      },
    })
  );

  const taskIds = useMemo(() => tasks?.map((task: Task) => task.id), [tasks]);

  const onDragStart = (event: DragStartEvent) => {
    setCursorStyle("grabbing");
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = () => {
    setCursorStyle("grab");
    if (activeTask?.status === "pending") return;

    if (activeTask?.status === "done") {
      setEditOpen(true);
      return;
    }
    setOpen(true);
  };

  const onDragOver = (event: DragOverEvent) => {
    console.log("drag over");

    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    setTasks((prevTasks) => {
      const activeTaskIndex = prevTasks.findIndex(
        (task) => task.id === activeTaskId
      );
      const overTaskIndex = prevTasks.findIndex(
        (task) => task.id === overTaskId
      );

      // If `over.data.current` contains a columnId, we are hovering over a column
      const overColumnId = over.data.current?.columnId;
      if (overColumnId && prevTasks[activeTaskIndex].status !== overColumnId) {
        prevTasks[activeTaskIndex].status = overColumnId;
      }

      if (overTaskIndex !== -1) {
        return arrayMove(prevTasks, activeTaskIndex, overTaskIndex);
      }

      return [...prevTasks];
    });
  };

  useEffect(() => {
    if (assignedTasks) {
      setTasks(assignedTasks);
    }
  }, [assignedTasks]);

  if (isLoading) return <Text>loading...</Text>;

  return (
    <Box mx={100} mt={30}>
      <ReportCreateForm open={open} setOpen={setOpen} activeTask={activeTask} />
      <ReportEditForm
        open={editOpen}
        setOpen={setEditOpen}
        activeTask={activeTask}
      />
      <Grid>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          {columns.map((column) => (
            <Grid.Col span={4} key={column.id}>
              <Droppable id={column.id} columnId={column.id}>
                <Card withBorder radius={7}>
                  <Center
                    bg={getTaskColor(column.id)}
                    h={80}
                    style={{ borderRadius: "7px" }}
                  >
                    <Text fw={600} fz={18} c="white">
                      {column.title}
                    </Text>
                  </Center>
                  <Stack mt={20}>
                    <SortableContext items={taskIds ?? []}>
                      {tasks
                        ?.filter((task) => task.status === column.id)
                        ?.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            cursorStyle={cursorStyle}
                            setActiveTask={setActiveTask}
                            setOpen={setOpen}
                            setEditOpen={setEditOpen}
                          />
                        ))}
                    </SortableContext>
                  </Stack>
                </Card>
              </Droppable>
            </Grid.Col>
          ))}
        </DndContext>
      </Grid>
    </Box>
  );
};

export default AssignedTaskList;
