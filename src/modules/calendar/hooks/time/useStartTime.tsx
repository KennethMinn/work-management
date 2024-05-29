import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useStartTime = () => {
  const refStart = useRef<HTMLInputElement>(null);
  const pickerControlStart = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refStart.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refStart, pickerControlStart };
};
