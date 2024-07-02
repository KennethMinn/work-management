import React, { FC, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Highlight, TTaskFormSchema } from "../../types";
import {
  ActionIcon,
  Flex,
  Grid,
  MultiSelect,
  Select,
  Table,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconPlus, IconTrash } from "@tabler/icons-react";
import { Employee } from "../../../project/types";
import { useHighlightTime } from "../../hooks/time/useHighlightTime";

interface VideoEditFormProps {
  isDetail?: boolean;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
  employees: Employee[];
  highlight: Highlight[];
  setHighlight: React.Dispatch<React.SetStateAction<Highlight[]>>;
}

const VideoEditForm: FC<VideoEditFormProps> = ({
  control,
  errors,
  register,
  isDetail,
  employees,
  highlight,
  setHighlight,
}) => {
  const { pickerControlHighlightTime, refHighlightTime } = useHighlightTime();
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [remark, setRemark] = useState("");

  const handleAddItem = () => {
    setHighlight([...highlight, { id: Date.now(), time, description, remark }]);
    setTime("");
    setDescription("");
    setRemark("");
  };

  const handleChange = (
    id: number,
    time: string,
    description: string,
    remark: string
  ) => {
    setHighlight((prevHighlight) =>
      prevHighlight.map((highlight) =>
        highlight.id === id
          ? { ...highlight, time, description, remark }
          : highlight
      )
    );
  };

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
            label="Account Executive"
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
        name="video_editor"
        control={control}
        render={({ field }) => (
          <MultiSelect
            label="Video Editor"
            style={{ width: "100%" }}
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
      <Grid gutter="xs" align="end">
        <Grid.Col span={2.5}>
          <TimeInput
            disabled={isDetail}
            label="Time"
            style={{ width: "100%" }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            ref={refHighlightTime}
            rightSection={pickerControlHighlightTime}
          />
        </Grid.Col>
        <Grid.Col span={4.5}>
          <TextInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            withAsterisk
            disabled={isDetail}
            label="Description"
            placeholder="Enter description"
          />
        </Grid.Col>
        <Grid.Col span={4.5}>
          <TextInput
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            withAsterisk
            disabled={isDetail}
            label="Remark"
            placeholder="Enter remark"
          />
        </Grid.Col>
        <Grid.Col span={0.5}>
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={handleAddItem}
          >
            <IconPlus stroke={1.5} size={20} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      {highlight.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Remark</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {highlight.map((highlight, i) => (
              <Table.Tr key={i}>
                <Table.Td>{++i}</Table.Td>
                <Table.Td>
                  <TimeInput
                    w={100}
                    disabled={isDetail}
                    style={{ width: "100%" }}
                    value={highlight.time}
                    onChange={(e) =>
                      handleChange(
                        highlight.id,
                        e.target.value,
                        highlight.description,
                        highlight.remark
                      )
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    value={highlight.description}
                    onChange={(e) =>
                      handleChange(
                        highlight.id,
                        highlight.time,
                        e.target.value,
                        highlight.remark
                      )
                    }
                    withAsterisk
                    disabled={isDetail}
                    placeholder="Enter description"
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    value={highlight.remark}
                    onChange={(e) =>
                      handleChange(
                        highlight.id,
                        highlight.time,
                        highlight.description,
                        e.target.value
                      )
                    }
                    withAsterisk
                    disabled={isDetail}
                    placeholder="Enter remark"
                  />
                </Table.Td>
                <Table.Td>
                  <Flex align="center" gap="sm"></Flex>
                  <IconTrash
                    onClick={() =>
                      setHighlight((prevHighlight) =>
                        prevHighlight.filter(
                          (prevItem) => prevItem.id !== highlight.id
                        )
                      )
                    }
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default VideoEditForm;
