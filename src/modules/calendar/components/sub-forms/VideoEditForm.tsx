import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";
import { Flex, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { Employee } from "../../../project/types";

interface VideoEditFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
  employees: Employee[];
}

const VideoEditForm: FC<VideoEditFormProps> = ({
  control,
  errors,
  register,
  isDetail,
  employees,
}) => {
  return (
    <React.Fragment>
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="Brand name"
        {...register("brand_name")}
        placeholder="Enter brand name"
        error={errors.brand_name?.message}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="Project title"
        {...register("project_title")}
        placeholder="Enter project title"
        error={errors.project_title?.message}
      />
      <Controller
        name="project_start_date"
        control={control}
        render={({ field }) => (
          <DatePickerInput
            withAsterisk
            style={{ width: "100%" }}
            {...field}
            label="Project start date"
            error={errors.project_start_date?.message}
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)}
            leftSection={<IconCalendar />}
            leftSectionPointerEvents="none"
            placeholder="Pick date"
          />
        )}
      />
      <Flex align="center" gap="lg">
        <Controller
          name="draft_deadline"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              withAsterisk
              error={errors.draft_deadline?.message}
              label="Draft deadline"
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
          name="final_deadline"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              withAsterisk
              style={{ width: "50%" }}
              {...field}
              label="Final deadline"
              error={errors.final_deadline?.message}
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              leftSection={<IconCalendar />}
              leftSectionPointerEvents="none"
              placeholder="Pick date"
            />
          )}
        />
      </Flex>
      <Flex align="center" gap="lg">
        <Controller
          name="account_executive"
          control={control}
          render={({ field }) => (
            <Select
              label="Account Executive"
              style={{ width: "50%" }}
              placeholder="Pick account executive"
              data={employees?.map((employee: Employee) => ({
                label: employee.name,
                value: employee.id.toString(),
              }))}
              {...field}
              error={errors.account_executive?.message}
            />
          )}
        />
        <Controller
          name="video_editor"
          control={control}
          render={({ field }) => (
            <Select
              label="Video Editor"
              style={{ width: "50%" }}
              placeholder="Pick video editor"
              data={employees?.map((employee: Employee) => ({
                label: employee.name,
                value: employee.id.toString(),
              }))}
              {...field}
              error={errors.video_editor?.message}
            />
          )}
        />
      </Flex>
      <Textarea
        resize="vertical"
        withAsterisk
        disabled={isDetail}
        {...register("project_description")}
        style={{ width: "100%" }}
        label="Project description"
        placeholder="Enter project description"
        error={errors.project_description?.message}
      />
      <Textarea
        resize="vertical"
        withAsterisk
        disabled={isDetail}
        {...register("client_request_detail")}
        style={{ width: "100%" }}
        label="Client request detail"
        placeholder="Enter client request detail"
        error={errors.client_request_detail?.message}
      />
      <Flex align="center" gap="lg">
        <TextInput
          style={{ width: "50%" }}
          withAsterisk
          disabled={isDetail}
          label="Editing style"
          {...register("editing_style")}
          placeholder="Enter editing style"
          error={errors.editing_style?.message}
        />
        <TextInput
          style={{ width: "50%" }}
          withAsterisk
          disabled={isDetail}
          label="Color grade"
          {...register("color_grade")}
          placeholder="Enter color grade"
          error={errors.color_grade?.message}
        />
      </Flex>
      <Flex align="center" gap="lg">
        <TextInput
          style={{ width: "50%" }}
          withAsterisk
          disabled={isDetail}
          label="Motion text effect"
          {...register("motion_text_effect")}
          placeholder="Enter motion text effect"
          error={errors.motion_text_effect?.message}
        />
        <TextInput
          style={{ width: "50%" }}
          withAsterisk
          disabled={isDetail}
          label="3D animation"
          {...register("three_d_animation")}
          placeholder="Enter 3d animation"
          error={errors.three_d_animation?.message}
        />
      </Flex>
    </React.Fragment>
  );
};

export default VideoEditForm;
