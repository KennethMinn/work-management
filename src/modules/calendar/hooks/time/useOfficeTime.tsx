import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useOfficeTime = () => {
  const refOfficeTime = useRef<HTMLInputElement>(null);
  const pickerControlOfficeTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refOfficeTime.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refOfficeTime, pickerControlOfficeTime };
};
