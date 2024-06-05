import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useReportTime = () => {
  const refReportTime = useRef<HTMLInputElement>(null);
  const pickerControlReportTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refReportTime.current?.showPicker()}
    >
      <IconClock style={{ width: 20, height: 20 }} stroke={1.5} />
    </ActionIcon>
  );

  return { refReportTime, pickerControlReportTime };
};
