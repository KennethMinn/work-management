import { EventProps } from "react-big-calendar";
import { Task } from "../types";
import { Box, Text } from "@mantine/core";

export const CustomEventComponent: React.FC<EventProps<Task>> = (props) => {
  let bgColor;
  switch (props.event.status) {
    case "inProgress":
      bgColor = "blue";
      break;
    default:
      bgColor = "green";
  }

  return (
    <Box
      px={5}
      bg={bgColor}
      style={{
        borderRadius: "5px",
      }}
    >
      <Text onClick={() => console.log(props.event)}>{props.event.title}</Text>
    </Box>
  );
};
