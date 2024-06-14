import {
  Button,
  FileButton,
  Flex,
  Grid,
  Group,
  Image,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconCloudUpload } from "@tabler/icons-react";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TTaskFormSchema } from "../../types";
import { Employee } from "../../../project/types";

interface DesignFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
  previewUrl: string | null;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  resetRef: React.RefObject<() => void>;
  clearFile: () => void;
  employees: Employee[];
}

const DesignForm: FC<DesignFormProps> = ({
  errors,
  register,
  control,
  previewUrl,
  file,
  setFile,
  resetRef,
  clearFile,
  employees,
  isDetail,
}) => {
  return (
    <React.Fragment>
      <Flex align="center" gap="lg">
        <TextInput
          disabled={isDetail}
          label="Brand"
          style={{ width: "50%" }}
          placeholder="Enter brand"
          {...register("brand")}
          error={errors.brand?.message}
        />
        <TextInput
          disabled={isDetail}
          label="Media type"
          style={{ width: "50%" }}
          placeholder="Enter media type"
          {...register("type_of_media")}
          error={errors.type_of_media?.message}
        />
      </Flex>
      <Flex align="center" gap="lg">
        <Controller
          name="designer_id"
          control={control}
          render={({ field }) => (
            <Select
              disabled={isDetail}
              label="Designer"
              style={{ width: "50%" }}
              placeholder="Pick designer"
              data={employees?.map((employee: Employee) => ({
                label: employee.name,
                value: employee.id.toString(),
              }))}
              {...field}
              error={errors.designer_id?.message}
            />
          )}
        />
        <Controller
          name="content_writer_id"
          control={control}
          render={({ field }) => (
            <Select
              disabled={isDetail}
              label="Content Write"
              style={{ width: "50%" }}
              placeholder="Pick content writer"
              data={employees?.map((employee: Employee) => ({
                label: employee.name,
                value: employee.id.toString(),
              }))}
              {...field}
              error={errors.content_writer_id?.message}
            />
          )}
        />
      </Flex>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            disabled={isDetail}
            label="Visual Copy"
            style={{ width: "100%" }}
            placeholder="Enter visual copy"
            {...register("visual_copy")}
            error={errors.visual_copy?.message}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Headline"
            disabled={isDetail}
            style={{ width: "100%" }}
            placeholder="Enter headline"
            {...register("headline")}
            error={errors.headline?.message}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                disabled={isDetail}
                style={{ width: "100%" }}
                {...field}
                label="Deadline"
                error={errors.deadline?.message}
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                leftSection={<IconCalendar />}
                leftSectionPointerEvents="none"
                placeholder="Pick deadline"
              />
            )}
          />
        </Grid.Col>
      </Grid>
      <Flex align="center" gap="lg">
        <TextInput
          disabled={isDetail}
          label="Body"
          style={{ width: "50%" }}
          placeholder="Enter body"
          {...register("body")}
          error={errors.body?.message}
        />
        <TextInput
          disabled={isDetail}
          label="Objective"
          style={{ width: "50%" }}
          placeholder="Enter objectice"
          {...register("objective")}
          error={errors.objective?.message}
        />
      </Flex>
      <Flex align="center" gap="lg">
        <TextInput
          disabled={isDetail}
          label="Important information"
          style={{ width: "50%" }}
          placeholder="Enter important information"
          {...register("important_info")}
          error={errors.important_info?.message}
        />
        <TextInput
          disabled={isDetail}
          label="Tease & Style"
          style={{ width: "50%" }}
          placeholder="Enter taste & style"
          {...register("taste_style")}
          error={errors.taste_style?.message}
        />
      </Flex>
      <Flex direction="column" gap={4}>
        <Text fz="sm" fw={500}>
          Artwork size
        </Text>
        <Grid>
          <Grid.Col span={2.4}>
            <TextInput
              disabled={isDetail}
              style={{ width: "100%" }}
              placeholder="Visual format"
              {...register("visual_format")}
              error={errors.visual_format?.message}
            />
          </Grid.Col>
          <Grid.Col span={2.4}>
            <TextInput
              disabled={isDetail}
              style={{ width: "100%" }}
              placeholder="Aspect ratio"
              {...register("aspect_ratio")}
              error={errors.aspect_ratio?.message}
            />
          </Grid.Col>
          <Grid.Col span={2.4}>
            <TextInput
              disabled={isDetail}
              style={{ width: "100%" }}
              placeholder="Width"
              {...register("width")}
              error={errors.width?.message}
            />
          </Grid.Col>
          <Grid.Col span={2.4}>
            <TextInput
              disabled={isDetail}
              style={{ width: "100%" }}
              placeholder="Height"
              {...register("height")}
              error={errors.height?.message}
            />
          </Grid.Col>
          <Grid.Col span={2.4}>
            <TextInput
              disabled={isDetail}
              style={{ width: "100%" }}
              placeholder="Resolution"
              {...register("resolution")}
              error={errors.resolution?.message}
            />
          </Grid.Col>
        </Grid>
      </Flex>
      {previewUrl && <Image radius="md" src={previewUrl} />}
      <Flex align="center" gap="lg">
        <Group style={{ width: "100%" }}>
          <FileButton
            disabled={isDetail}
            resetRef={resetRef}
            onChange={setFile}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button leftSection={<IconCloudUpload />} {...props}>
                reference photo
              </Button>
            )}
          </FileButton>
          <Button disabled={!file} color="red" onClick={clearFile}>
            Reset
          </Button>
        </Group>
        <TextInput
          disabled={isDetail}
          style={{ width: "100%" }}
          placeholder="Enter reference name"
          {...register("reference")}
          error={errors.reference?.message}
        />
      </Flex>
    </React.Fragment>
  );
};

export default DesignForm;
