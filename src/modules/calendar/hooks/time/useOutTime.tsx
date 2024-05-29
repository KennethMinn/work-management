import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useOutTime = () => {
  const refOutTime = useRef<HTMLInputElement>(null);
  const pickerControlOutTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refOutTime.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refOutTime, pickerControlOutTime };
};
