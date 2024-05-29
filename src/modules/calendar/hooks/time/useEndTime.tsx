import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useEndTime = () => {
  const refEnd = useRef<HTMLInputElement>(null);
  const pickerControlEnd = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refEnd.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refEnd, pickerControlEnd };
};
