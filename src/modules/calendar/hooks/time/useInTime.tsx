import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useInTime = () => {
  const refInTime = useRef<HTMLInputElement>(null);
  const pickerControlInTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refInTime.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refInTime, pickerControlInTime };
};
