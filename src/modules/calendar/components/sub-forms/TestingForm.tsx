import { Checkbox, Select, Textarea } from "@mantine/core";
import React, { FC, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";

interface TestingFormProps {
  isDetail?: boolean;
  checked?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
}

const TestingForm: FC<TestingFormProps> = ({
  errors,
  isDetail,
  register,
  control,
  checked: initialChecked,
}) => {
  const [checked, setChecked] = useState(initialChecked || false);

  return (
    <React.Fragment>
      <Controller
        name="testing_type"
        control={control}
        render={({ field }) => (
          <Select
            withAsterisk
            {...field}
            label="Testing type"
            style={{ width: "100%" }}
            placeholder="Pick type"
            error={errors.testing_type?.message}
            data={[
              "Functional",
              "Modular",
              "Integration",
              "Deployment",
              "Other",
            ]}
          />
        )}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("initial_test_brief")}
        style={{ width: "100%" }}
        label="Initial test brief"
        placeholder="Enter initial test brief"
        error={errors.initial_test_brief?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("testing_issues")}
        style={{ width: "100%" }}
        label="Issues and bugs"
        placeholder="Enter issues"
        error={errors.testing_issues?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("testing_overall")}
        style={{ width: "100%" }}
        label="Overall test brief"
        placeholder="Enter overall test brief"
        error={errors.testing_overall?.message}
      />
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="Customer involved"
      />
      {checked && (
        <Textarea
          disabled={isDetail}
          {...register("customer_comment")}
          style={{ width: "100%" }}
          label="Customer comment"
          placeholder="Enter customer comment"
          error={errors.customer_comment?.message}
        />
      )}
    </React.Fragment>
  );
};

export default TestingForm;
