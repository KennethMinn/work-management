import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomEventComponent } from "../components/CustomEventComponent";
import { useNavigate } from "react-router-dom";
import { useGetAllTasks } from "../hooks/useGetAllTasks";
import { Task } from "../types";
import { useDisclosure } from "@mantine/hooks";
import TaskCreateForm from "../components/TaskCreateForm";
import { useState } from "react";
import { Text } from "@mantine/core";
import { useToggleModal } from "../../../hooks/useToggleModal";
import TaskEditForm from "../components/TaskEditForm";

const localizer = dayjsLocalizer(dayjs);

// const events = [
//   {
//     title: "Test",
//     start: dayjs("2024-05-14T10:00:00").toDate(),
//     end: dayjs("2024-05-14T11:00:00").toDate(),
//   }
// ];

const components = {
  event: CustomEventComponent,
};

const CalendarList = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { open: editOpen, setOpen } = useToggleModal();

  const { data: tasks, isLoading } = useGetAllTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [start, setStart] = useState<Date | undefined>();

  const events = tasks?.map((task: Task) => ({
    ...task,
    start: dayjs(task.start_date).toDate(),
    end: dayjs(task.end_date).toDate(),
  }));

  if (isLoading) return <Text>loading...</Text>;

  return (
    <div>
      {opened && <TaskCreateForm opened={opened} close={close} start={start} />}
      {editOpen && task && (
        <TaskEditForm
          opened={editOpen}
          assignedTask={task}
          close={() => setOpen(false)}
        />
      )}
      <Calendar
        min={dayjs("2024-05-14T09:00:00").toDate()}
        max={dayjs("2024-05-14T18:00:00").toDate()}
        views={["month"]}
        events={events}
        localizer={localizer}
        startAccessor={(task) => new Date(task.start_date)}
        endAccessor={(task) => new Date(task.end_date)}
        style={{ height: 550 }}
        selectable
        onSelectSlot={({ start }) => {
          setStart(start);
          open();
        }}
        onSelectEvent={(event) => {
          setTask(event);
          setOpen(true);
        }}
        onShowMore={(events) => {
          navigate("/dashboard/all-tasks", { state: events });
        }}
        components={components}
      />
    </div>
  );
};

export default CalendarList;
