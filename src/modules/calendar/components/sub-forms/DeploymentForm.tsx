import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";
import React, { FC } from "react";
import {
  Checkbox,
  Flex,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";

interface DeploymentFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
}

const DeploymentForm: FC<DeploymentFormProps> = ({
  isDetail,
  errors,
  register,
  control,
}) => {
  const deployedProject = useWatch({
    control,
    name: "project_type",
  });

  return (
    <React.Fragment>
      <Flex gap="lg" align="center">
        <Controller
          name="deployment_type"
          control={control}
          render={({ field }) => (
            <Select
              withAsterisk
              {...field}
              label="Deployment type"
              style={{ width: "50%" }}
              placeholder="Pick type"
              data={[
                "Functional",
                "Modular",
                "Integration",
                "Revision",
                "Other",
              ]}
              error={errors.deployment_type?.message}
            />
          )}
        />
        <Controller
          name="server_type"
          control={control}
          render={({ field }) => (
            <Select
              withAsterisk
              {...field}
              label="Server type"
              style={{ width: "50%" }}
              placeholder="Pick server"
              data={["Cpanel", "AWS", "Azure"]}
              error={errors.server_type?.message}
            />
          )}
        />
      </Flex>
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("deployment_brief")}
        style={{ width: "100%" }}
        label="Deployment brief"
        placeholder="Enter deployment brief"
        error={errors.deployment_brief?.message}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        {...register("instance_name")}
        style={{ width: "100%" }}
        label="Instance name"
        placeholder="Enter instance name"
        error={errors.instance_name?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("configuration")}
        style={{ width: "100%" }}
        label="Configuration"
        placeholder="Enter configuration"
        error={errors.configuration?.message}
      />
      <Flex gap="lg" align="center">
        <TextInput
          withAsterisk
          disabled={isDetail}
          {...register("db_type")}
          style={{ width: "50%" }}
          label="Database type"
          placeholder="Enter database type"
          error={errors.db_type?.message}
        />
        <TextInput
          withAsterisk
          disabled={isDetail}
          {...register("db_name")}
          style={{ width: "50%" }}
          label="Database name"
          placeholder="Enter database name"
          error={errors.db_name?.message}
        />
      </Flex>
      <Flex gap="lg" align="center">
        <TextInput
          withAsterisk
          disabled={isDetail}
          {...register("ip_and_port")}
          style={{ width: "50%" }}
          label="Ip and port"
          placeholder="Enter ip and port"
          error={errors.ip_and_port?.message}
        />
        <TextInput
          withAsterisk
          disabled={isDetail}
          {...register("username")}
          style={{ width: "50%" }}
          label="Username"
          placeholder="Enter username"
          error={errors.username?.message}
        />
      </Flex>
      <Controller
        name="project_type"
        control={control}
        render={({ field }) => (
          <MultiSelect
            withAsterisk
            disabled={isDetail}
            hidePickedOptions
            label="Type of project deployed"
            style={{ width: "100%" }}
            placeholder="Pick project type"
            data={["Laravel", "NodeJs", "React", "Vue", "Mobile"]}
            {...field}
            error={errors.project_type?.message}
          />
        )}
      />
      {deployedProject?.includes("Mobile") && (
        <Flex align="center" gap="lg">
          <Checkbox
            {...register("apk_released_if_mobile")}
            label="Apk released"
          />
          <Checkbox
            {...register("sent_to_customer_if_mobile")}
            label="Sent to customer"
          />
        </Flex>
      )}
      <Controller
        name="dev_type"
        control={control}
        render={({ field }) => (
          <MultiSelect
            withAsterisk
            disabled={isDetail}
            hidePickedOptions
            label="Type of dev deployed"
            style={{ width: "100%" }}
            placeholder="Pick dev type"
            data={["Frontend", "Backend"]}
            {...field}
            error={errors.dev_type?.message}
          />
        )}
      />
      <TextInput
        withAsterisk
        disabled={isDetail}
        {...register("sub_domain")}
        style={{ width: "100%" }}
        label="Subdomain attached"
        placeholder="Enter subdomain attached"
        error={errors.sub_domain?.message}
      />

      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("deployment_issues")}
        style={{ width: "100%" }}
        label="Any Issues and Bugs"
        placeholder="Enter issues and bugs"
        error={errors.deployment_issues?.message}
      />
      <Textarea
        withAsterisk
        disabled={isDetail}
        {...register("deployment_overall")}
        style={{ width: "100%" }}
        label="Overall deployment result"
        placeholder="Enter deployment result"
        error={errors.deployment_overall?.message}
      />
    </React.Fragment>
  );
};

export default DeploymentForm;
