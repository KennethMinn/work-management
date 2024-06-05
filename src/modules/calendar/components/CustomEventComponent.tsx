import { EventProps } from "react-big-calendar";
import { Box, Text } from "@mantine/core";

import { Task } from "../types";
import { getTaskColor } from "../../assigned-tasks/utils";

export const CustomEventComponent: React.FC<EventProps<Task>> = (props) => {
  return (
    <Box
      px={5}
      bg={getTaskColor(props.event.status)}
      style={{
        borderRadius: "5px",
      }}
    >
      <Text>{props.event.title}</Text>
    </Box>
  );
};
