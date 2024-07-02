import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";
import {
  Flex,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { Employee } from "../../../project/types";

interface PhotoEditFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
  employees: Employee[];
}

const PhotoEditForm: FC<PhotoEditFormProps> = ({
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
      <Controller
        name="account_executive"
        control={control}
        render={({ field }) => (
          <Select
            label="Account executive"
            style={{ width: "100%" }}
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
        name="photo_retoucher"
        control={control}
        render={({ field }) => (
          <MultiSelect
            label="Photo Editor"
            style={{ width: "100%" }}
            placeholder="Pick photo editor"
            data={employees?.map((employee: Employee) => ({
              label: employee.name,
              value: employee.id.toString(),
            }))}
            {...field}
            error={errors.photo_retoucher?.message}
          />
        )}
      />
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
        <Controller
          name="number_of_retouch_photos"
          control={control}
          render={({ field }) => (
            <NumberInput
              withAsterisk
              style={{ width: "50%" }}
              {...field}
              label="Number of retouch photos"
              placeholder="Enter number"
              error={errors.number_of_retouch_photos?.message}
            />
          )}
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
      <TextInput
        style={{ width: "100%" }}
        withAsterisk
        disabled={isDetail}
        label="Editing style"
        {...register("editing_style")}
        placeholder="Enter editing style"
        error={errors.editing_style?.message}
      />
      <Textarea
        resize="vertical"
        withAsterisk
        disabled={isDetail}
        {...register("remark")}
        style={{ width: "100%" }}
        label="Remark"
        placeholder="Enter remark"
        error={errors.remark?.message}
      />
      <Textarea
        resize="vertical"
        withAsterisk
        disabled={isDetail}
        {...register("editing_reference")}
        style={{ width: "100%" }}
        label="Reference"
        placeholder="Enter reference"
        error={errors.editing_reference?.message}
      />
    </React.Fragment>
  );
};

export default PhotoEditForm;
