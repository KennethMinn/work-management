import { Flex, Textarea, TextInput } from "@mantine/core";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useNotifyTime } from "../../hooks/time/useNotifyTime";

interface ContentManagementFormProps {
  isDetail?: boolean;
  control: Control<TTaskFormSchema>;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
}

const ContentManagementForm: FC<ContentManagementFormProps> = ({
  control,
  errors,
  register,
  isDetail,
}) => {
  const { refNotifyTime, pickerNotifyTime } = useNotifyTime();
  return (
    <React.Fragment>
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="Title"
        {...register("content_title")}
        placeholder="Enter title"
        error={errors.content_title?.message}
      />
      <Textarea
        disabled={isDetail}
        {...register("content_description")}
        style={{ width: "100%" }}
        label="Description"
        placeholder="Enter description"
        error={errors.content_description?.message}
      />
      <Flex align="center" gap="lg">
        <Controller
          name="notify_date"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              error={errors.notify_date?.message}
              label="Notify Date"
              style={{ width: "50%" }}
              {...field}
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              leftSection={<IconCalendar />}
              leftSectionPointerEvents="none"
              placeholder="Pick date"
            />
          )}
        />
        <Controller
          name="notify_time"
          control={control}
          render={({ field }) => (
            <TimeInput
              {...field}
              label="Notify time"
              error={errors.end_time?.message}
              style={{ width: "50%" }}
              value={field.value || ""} // Ensure value is defined
              onChange={(time) => field.onChange(time)}
              ref={refNotifyTime}
              rightSection={pickerNotifyTime}
            />
          )}
        />
      </Flex>
    </React.Fragment>
  );
};

export default ContentManagementForm;
