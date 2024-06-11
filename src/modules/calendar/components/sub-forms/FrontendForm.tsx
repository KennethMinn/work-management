import { Select, Textarea } from "@mantine/core";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";

interface FrontendFormProps {
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
}

const FrontendForm: FC<FrontendFormProps> = ({ errors, register, control }) => {
  return (
    <React.Fragment>
      <Controller
        name="feature_type"
        control={control}
        render={({ field }) => (
          <Select
            label="Type"
            style={{ width: "100%" }}
            placeholder="Pick type"
            data={["Form", "List", "Dialog", "Flow"]}
            {...field}
            error={errors.feature_type?.message}
          />
        )}
      />
      <Textarea
        {...register("reference_figma")}
        style={{ width: "100%" }}
        label="Reference figma"
        placeholder="Enter reference figma link"
        error={errors.reference_figma?.message}
      />
      <Textarea
        {...register("detail_task")}
        style={{ width: "100%" }}
        label="Task detail"
        placeholder="Enter project details"
        error={errors.detail_task?.message}
      />
      <Textarea
        {...register("design_validation_detail")}
        style={{ width: "100%" }}
        label="Design validation detail"
        placeholder="Enter design validation detail"
        error={errors.design_validation_detail?.message}
      />
      <Textarea
        {...register("styling_detail")}
        style={{ width: "100%" }}
        label="Styling detail"
        placeholder="Enter styling detail"
        error={errors.styling_detail?.message}
      />
      <Textarea
        {...register("api_integration")}
        style={{ width: "100%" }}
        label="API integration"
        placeholder="Enter api integration"
        error={errors.api_integration?.message}
      />
    </React.Fragment>
  );
};

export default FrontendForm;
