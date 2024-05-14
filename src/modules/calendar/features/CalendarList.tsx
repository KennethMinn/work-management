import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomEventComponent } from "../components/CustomEventComponent";

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: "Test",
    start: dayjs("2024-05-14T10:00:00").toDate(),
    end: dayjs("2024-05-14T11:00:00").toDate(),
  },
  {
    title: "Test2",
    start: dayjs("2024-05-14T10:00:00").toDate(),
    end: dayjs("2024-05-14T11:00:00").toDate(),
  },
  {
    title: "Test3",
    start: dayjs("2024-05-14T10:00:00").toDate(),
    end: dayjs("2024-05-14T11:00:00").toDate(),
  },
];

const CustomEventContainerWrapper = (props) => {
  console.log(props);
  return <div>dsfdasf</div>;
};

const components = {
  event: CustomEventComponent,
  eventContainerWrapper: CustomEventContainerWrapper,
};

const CalendarList = () => {
  return (
    <div>
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
        onSelectSlot={({ start, end }) => {
          console.log(start, end);
          alert("form");
        }}
        onSelectEvent={(event) => alert(event.title)}
        onShowMore={(events) => {
          console.log(events);
          alert("all tasks");
        }}
        components={components}
      />
    </div>
  );
};

export default CalendarList;
