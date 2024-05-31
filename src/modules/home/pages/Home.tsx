import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { columns } from "../utils";
import { Box, Card, Center, Grid, Modal, Stack, Text } from "@mantine/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "../components/TaskCard";
import { useGetTasksByEmployeeId } from "../hooks/useGetTasksByEmployeeId";
import { Task } from "../../calendar/types";
import { Droppable } from "../components/Droppable";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: assignedTasks, isLoading } = useGetTasksByEmployeeId(user?.id);
  const [tasks, setTasks] = useState<Task[]>(assignedTasks || []);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [cursorStyle, setCursorStyle] = useState("grab");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (assignedTasks) {
      setTasks(assignedTasks);
    }
  }, [assignedTasks]);

  const taskIds = useMemo(() => tasks?.map((task: Task) => task.id), [tasks]);

  if (isLoading) return <Text>loading...</Text>;

  const onDragStart = (event: DragStartEvent) => {
    setCursorStyle("grabbing");
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      console.log(event.active.data.current.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setCursorStyle("grab");
    if (activeTask?.status === "pending") return;
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

  return (
    <Box mx={100} mt={30}>
      <Modal opened={open} onClose={() => setOpen(false)}>
        {activeTask?.title}
        {activeTask?.status}
      </Modal>
      <Grid>
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          {columns.map((column) => (
            <Grid.Col span={4} key={column.id}>
              <Droppable id={column.id} columnId={column.id}>
                <Card withBorder>
                  <Center>
                    <Text fw={600} fz={18}>
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

export default Home;
