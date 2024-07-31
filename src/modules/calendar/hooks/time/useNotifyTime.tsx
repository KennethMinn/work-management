import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useNotifyTime = () => {
  const refNotifyTime = useRef<HTMLInputElement>(null);
  const pickerNotifyTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refNotifyTime.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refNotifyTime, pickerNotifyTime };
};
