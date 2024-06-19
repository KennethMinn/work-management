import {
  Flex,
  MultiSelect,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";

interface UiUxFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
}

const UiUxForm: FC<UiUxFormProps> = ({
  isDetail,
  errors,
  register,
  control,
}) => {
  return (
    <React.Fragment>
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("customer_requirement")}
        style={{ width: "100%" }}
        label="Customer requirement"
        placeholder="Enter customer requirement"
        error={errors.customer_requirement?.message}
      />
      <Controller
        name="ui_type"
        control={control}
        render={({ field }) => (
          <MultiSelect
            withAsterisk
            hidePickedOptions
            disabled={isDetail}
            label="Type"
            style={{ width: "100%" }}
            placeholder="Pick type"
            data={["User flow", "Sketches or wireframes", "Research"]}
            {...field}
            error={errors.ui_type?.message}
          />
        )}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        {...register("reference_platform")}
        style={{ width: "100%" }}
        label="Reference platform"
        placeholder="Enter reference platform"
        error={errors.reference_platform?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("ui_detail_task")}
        style={{ width: "100%" }}
        label="Detail task"
        placeholder="Enter detail task"
        error={errors.ui_detail_task?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("ui_styling_detail")}
        style={{ width: "100%" }}
        label="Styling detail"
        placeholder="Enter styling detail"
        error={errors.styling_detail?.message}
      />
      <Flex gap="lg" align="center">
        <Controller
          name="total_ui_screen"
          control={control}
          render={({ field }) => (
            <NumberInput
              withAsterisk
              style={{ width: "50%" }}
              {...field}
              label="Total ui screen"
              placeholder="Enter total ui screens"
              error={errors.total_ui_screen?.message}
            />
          )}
        />
        <Controller
          name="confirmed_ui_screen"
          control={control}
          render={({ field }) => (
            <NumberInput
              withAsterisk
              style={{ width: "50%" }}
              {...field}
              label="Confirm ui screen"
              placeholder="Enter confirm ui screens"
              error={errors.confirmed_ui_screen?.message}
            />
          )}
        />
      </Flex>
    </React.Fragment>
  );
};

export default UiUxForm;
