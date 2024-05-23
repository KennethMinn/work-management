import { EventProps } from "react-big-calendar";
import { MyEvent } from "../types";

export const CustomEventComponent: React.FC<EventProps<MyEvent>> = (props) => {
  console.log(props);
  return (
    <div
      style={{
        backgroundColor: "blue",
        borderRadius: "5px",
        padding: "0 5px",
      }}
    >
      {props.event.title}
    </div>
  );
};
