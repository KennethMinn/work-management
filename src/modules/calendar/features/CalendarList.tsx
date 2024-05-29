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

const localizer = dayjsLocalizer(dayjs);

// const events = [
//   {
//     title: "Test",
//     start: dayjs("2024-05-14T10:00:00").toDate(),
//     end: dayjs("2024-05-14T11:00:00").toDate(),
//   },
//   {
//     title: "Test2",
//     start: dayjs("2024-05-14T10:00:00").toDate(),
//     end: dayjs("2024-05-14T11:00:00").toDate(),
//   },
//   {
//     title: "Test3",
//     start: dayjs("2024-05-14T10:00:00").toDate(),
//     end: dayjs("2024-05-14T11:00:00").toDate(),
//   },
// ];

const components = {
  event: CustomEventComponent,
};

const CalendarList = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: tasks } = useGetAllTasks();
  const [start, setStart] = useState<Date | undefined>();

  const events = tasks?.map((task: Task) => ({
    ...task,
    start: dayjs(task.start_date).toDate(),
    end: dayjs(task.end_date).toDate(),
  }));

  return (
    <div>
      <TaskCreateForm opened={opened} close={close} start={start} />
      <Calendar
        min={dayjs("2024-05-14T09:00:00").toDate()}
        max={dayjs("2024-05-14T18:00:00").toDate()}
        views={["month"]}
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 550 }}
        selectable
        onSelectSlot={({ start }) => {
          setStart(start);
          console.log(start);
          open();
        }}
        //onSelectEvent={(event) => console.log(event)}
        onShowMore={(events) => {
          navigate("/all-tasks");
          console.log(events);
        }}
        components={components}
      />
    </div>
  );
};

export default CalendarList;
