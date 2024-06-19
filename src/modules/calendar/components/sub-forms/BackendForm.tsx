import { Textarea, TextInput } from "@mantine/core";
import React, { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TTaskFormSchema } from "../../types";

interface BackendFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
}

const BackendForm: FC<BackendFormProps> = ({ errors, register, isDetail }) => {
  return (
    <React.Fragment>
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("use_case")}
        style={{ width: "100%" }}
        label="Reference requirement/Use case"
        placeholder="Enter use case"
        error={errors.use_case?.message}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="CRUD type"
        {...register("crud_type")}
        placeholder="Enter crud type"
        error={errors.crud_type?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("detail")}
        style={{ width: "100%" }}
        label="Detail task"
        placeholder="Enter use case"
        error={errors.detail?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("database_migration")}
        style={{ width: "100%" }}
        label="Database migration"
        placeholder="Enter database migration"
        error={errors.database_migration?.message}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="Controller name"
        {...register("controller_name")}
        placeholder="Enter controller name"
        error={errors.controller_name?.message}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="Web/Api routes"
        {...register("routes")}
        placeholder="Enter routes"
        error={errors.routes?.message}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        label="Related view"
        {...register("related_view")}
        placeholder="Enter related view"
        error={errors.related_view?.message}
      />
    </React.Fragment>
  );
};

export default BackendForm;
