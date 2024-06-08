import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  MultiSelect,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCalendar, IconCloudUpload, IconTrash } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import {
  Customer,
  Item,
  Project,
  Task,
  taskFormSchema,
  TTaskFormSchema,
} from "../../calendar/types/index";
import React, { FC, useEffect, useRef, useState } from "react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useGetAllProjects } from "../../project/hooks/useGetAllProjects";
import { useGetAllEmployees } from "../../employee/hooks/useGetAllEmployees";
import { Employee } from "../../project/types";
import { useStartTime } from "../../calendar/hooks/time/useStartTime";
import { useEndTime } from "../../calendar/hooks/time/useEndTime";
import { useOfficeTime } from "../../calendar/hooks/time/useOfficeTime";
import { useInTime } from "../../calendar/hooks/time/useInTime";
import { useOutTime } from "../../calendar/hooks/time/useOutTime";

interface TaskDetailProp {
  assignedTask: Task;
  opened: boolean;
  close: () => void;
}

const TaskDetail: FC<TaskDetailProp> = ({ opened, close, assignedTask }) => {
  const [taskType, setTaskType] = useState<string | null>("");
  const { data: customers } = useGetAllCustomers();
  const { data: projects } = useGetAllProjects();
  const { data: employees } = useGetAllEmployees();

  const [items, setItems] = useState<Item[]>([]);

  //for avatar
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  //for times
  const { refStart, pickerControlStart } = useStartTime();
  const { refEnd, pickerControlEnd } = useEndTime();
  const { refOfficeTime, pickerControlOfficeTime } = useOfficeTime();
  const { refInTime, pickerControlInTime } = useInTime();
  const { refOutTime, pickerControlOutTime } = useOutTime();

  //to clear profile
  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<TTaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Clean up to revoke the object URL when the component unmounts or when the file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // Reset the previewUrl to null if no file is provided
      setPreviewUrl(null);
    }
  }, [file]); // Re-generate preview URL whenever the file changes

  useEffect(() => {
    setFile(null);
  }, [taskType]);

  useEffect(() => {
    if (assignedTask) {
      if (assignedTask.shootingData) {
        setTaskType("Shooting");
      }
      if (assignedTask.designData) {
        setTaskType("Graphic Design");
      }

      //root
      setValue("title", assignedTask.title || "");
      setValue("description", assignedTask.description);
      setValue("meeting_link", assignedTask.meeting_link);
      setValue("location", assignedTask.location);
      setValue("customer_id", assignedTask.customer_id.toString());
      setValue("project_id", assignedTask.project_id.toString());
      setValue("start_date", new Date(assignedTask.start_date));
      setValue("end_date", new Date(assignedTask.end_date));
      setValue("start_time", assignedTask.start_time);
      setValue("end_time", assignedTask.end_time);
      setValue("user_id", assignedTask.user_id.toString());

      //graphic design
      if (assignedTask?.designData) {
        setValue("brand", assignedTask.designData.brand);
        setValue("type_of_media", assignedTask.designData.type_of_media);
        setValue("designer_id", assignedTask.designData.designer_id.toString());
        setValue(
          "content_writer_id",
          assignedTask?.designData?.content_writer_id.toString()
        );
        setValue("visual_copy", assignedTask.designData.visual_copy);
        setValue("headline", assignedTask.designData.headline);
        setValue("deadline", new Date(assignedTask.designData.deadline));
        setValue("body", assignedTask.designData.body);
        setValue("objective", assignedTask.designData.objective);
        setValue("important_info", assignedTask.designData.important_info);
        setValue("taste_style", assignedTask.designData.taste_style);
        setValue(
          "visual_format",
          assignedTask.designData.artworkSizes.visual_format
        );
        setValue(
          "aspect_ratio",
          assignedTask.designData.artworkSizes.aspect_ratio
        );
        setValue("width", assignedTask.designData.artworkSizes.width);
        setValue("height", assignedTask.designData.artworkSizes.height);
        setValue("resolution", assignedTask.designData.artworkSizes.resolution);
        setValue("reference", assignedTask.designData.reference);
        setPreviewUrl(assignedTask.designData.imageURL);
      }

      //shooting
      if (assignedTask?.shootingData) {
        setValue("duration", assignedTask.shootingData.duration);
        setValue(
          "shooting_location",
          assignedTask.shootingData.shooting_location
        );
        setValue("type", assignedTask.shootingData.type);
        setValue(
          "transportation_charge",
          assignedTask.shootingData.transportation_charge
        );
        setValue("type_detail", assignedTask.shootingData.type_detail);
        setValue("script_detail", assignedTask.shootingData.script_detail);
        setValue("scene_number", assignedTask.shootingData.scene_number);
        setValue("contact_name", assignedTask.shootingData.contact_name);
        setValue("contact_phone", assignedTask.shootingData.contact_phone);
        setValue("crew_list", assignedTask.shootingData.crew_list);
        setValue(
          "photo_shooting_project",
          assignedTask.shootingData.photo_shooting_project
        );
        setValue(
          "video_shooting_project",
          assignedTask.shootingData.video_shooting_project
        );
        setValue(
          "arrive_office_on_time",
          assignedTask.shootingData.arrive_office_on_time
        );
        setValue("client", assignedTask.shootingData.client);
        setValue("in_time", assignedTask.shootingData.in_time);
        setValue("out_time", assignedTask.shootingData.out_time);
        setValue("project_details", assignedTask.shootingData.project_details);
        setValue("project_details", assignedTask.shootingData.project_details);
        setItems(assignedTask.shootingData.shooting_accessories);
      }
    }
  }, [assignedTask, setValue]);

  return (
    <Box>
      <Modal
        size={650}
        padding={30}
        opened={opened}
        onClose={close}
        title="Task Detail"
        centered
        styles={{
          title: {
            fontSize: "20px",
            fontWeight: 600,
          },
        }}
      >
        {!assignedTask ? (
          <Text>loading...</Text>
        ) : (
          <Box my={10}>
            <Stack gap={20}>
              {/* default forms */}
              <TextInput
                disabled
                label="Task title"
                style={{ width: "100%" }}
                placeholder="Enter task title"
                {...register("title")}
                error={errors.title?.message}
              />
              <Textarea
                disabled
                {...register("description")}
                style={{ width: "100%" }}
                label="Task description"
                placeholder="description"
                error={errors.description?.message}
              />
              <TextInput
                disabled
                label="Meeting link"
                style={{ width: "100%" }}
                placeholder="Enter meeting link"
                {...register("meeting_link")}
                error={errors.meeting_link?.message}
              />
              <TextInput
                disabled
                label="Location"
                style={{ width: "100%" }}
                placeholder="Enter location"
                {...register("location")}
                error={errors.location?.message}
              />
              <Flex align="center" gap="lg">
                <Controller
                  name="customer_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled
                      label="Cusotmer"
                      style={{ width: "50%" }}
                      placeholder="Pick customer"
                      data={customers?.map((customer: Customer) => ({
                        label: customer.name,
                        value: customer.id.toString(),
                      }))}
                      {...field}
                      error={errors.customer_id?.message}
                    />
                  )}
                />
                <Controller
                  name="project_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled
                      label="Project"
                      style={{ width: "50%" }}
                      placeholder="Pick project"
                      data={projects?.map((project: Project) => ({
                        label: project.name,
                        value: project.id.toString(),
                      }))}
                      {...field}
                      error={errors.project_id?.message}
                    />
                  )}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field }) => (
                    <DatePickerInput
                      disabled
                      error={errors.start_date?.message}
                      label="Start date"
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
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePickerInput
                      disabled
                      style={{ width: "50%" }}
                      {...field}
                      label="End date"
                      error={errors.end_date?.message}
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
                  name="start_time"
                  control={control}
                  render={({ field }) => (
                    <TimeInput
                      disabled
                      {...field}
                      label="Start time"
                      error={errors.start_time?.message}
                      style={{ width: "50%" }}
                      value={field.value || ""} // Ensure value is defined
                      onChange={(time) => field.onChange(time)}
                      ref={refStart}
                      rightSection={pickerControlStart}
                    />
                  )}
                />
                <Controller
                  name="end_time"
                  control={control}
                  render={({ field }) => (
                    <TimeInput
                      disabled
                      {...field}
                      label="End time"
                      error={errors.end_time?.message}
                      style={{ width: "50%" }}
                      value={field.value || ""} // Ensure value is defined
                      onChange={(time) => field.onChange(time)}
                      ref={refEnd}
                      rightSection={pickerControlEnd}
                    />
                  )}
                />
              </Flex>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled
                    label="Employee"
                    style={{ width: "100%" }}
                    placeholder="Pick employee"
                    data={employees?.map((employee: Employee) => ({
                      label: employee.name,
                      value: employee.id.toString(),
                    }))}
                    {...field}
                    error={errors.user_id?.message}
                  />
                )}
              />
              {/* dynamically rendered forms */}
              {/* graphic design */}
              {taskType === "Graphic Design" && (
                <React.Fragment>
                  <Flex align="center" gap="lg">
                    <TextInput
                      disabled
                      label="Brand"
                      style={{ width: "50%" }}
                      placeholder="Enter brand"
                      {...register("brand")}
                      error={errors.brand?.message}
                    />
                    <TextInput
                      disabled
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
                          disabled
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
                          disabled
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
                        disabled
                        label="Visual Copy"
                        style={{ width: "100%" }}
                        placeholder="Enter visual copy"
                        {...register("visual_copy")}
                        error={errors.visual_copy?.message}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <TextInput
                        disabled
                        label="Headline"
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
                            disabled
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
                      disabled
                      label="Body"
                      style={{ width: "50%" }}
                      placeholder="Enter body"
                      {...register("body")}
                      error={errors.body?.message}
                    />
                    <TextInput
                      disabled
                      label="Objective"
                      style={{ width: "50%" }}
                      placeholder="Enter objectice"
                      {...register("objective")}
                      error={errors.objective?.message}
                    />
                  </Flex>
                  <Flex align="center" gap="lg">
                    <TextInput
                      disabled
                      label="Important information"
                      style={{ width: "50%" }}
                      placeholder="Enter important information"
                      {...register("important_info")}
                      error={errors.important_info?.message}
                    />
                    <TextInput
                      disabled
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
                          disabled
                          style={{ width: "100%" }}
                          placeholder="Visual format"
                          {...register("visual_format")}
                          error={errors.visual_format?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          disabled
                          style={{ width: "100%" }}
                          placeholder="Aspect ratio"
                          {...register("aspect_ratio")}
                          error={errors.aspect_ratio?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          disabled
                          style={{ width: "100%" }}
                          placeholder="Width"
                          {...register("width")}
                          error={errors.width?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          disabled
                          style={{ width: "100%" }}
                          placeholder="Height"
                          {...register("height")}
                          error={errors.height?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          disabled
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
                        disabled
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
                      disabled
                      style={{ width: "100%" }}
                      placeholder="Enter reference name"
                      {...register("reference")}
                      error={errors.reference?.message}
                    />
                  </Flex>
                </React.Fragment>
              )}
              {taskType === "Shooting" && (
                <React.Fragment>
                  <TextInput
                    disabled
                    label="Duration"
                    style={{ width: "100%" }}
                    placeholder="Enter duration"
                    {...register("duration")}
                    error={errors.duration?.message}
                  />
                  <TextInput
                    disabled
                    label="Shooting location"
                    style={{ width: "100%" }}
                    placeholder="Enter shooting location"
                    {...register("shooting_location")}
                    error={errors.shooting_location?.message}
                  />
                  <Flex align="center" gap="lg">
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          disabled
                          label="Type"
                          style={{ width: "50%" }}
                          placeholder="Pick type"
                          data={["type"]}
                          {...field}
                          error={errors.type?.message}
                        />
                      )}
                    />
                    <TextInput
                      label="Transportation charge"
                      disabled
                      style={{ width: "50%" }}
                      placeholder="Enter transportation"
                      {...register("transportation_charge")}
                      error={errors.transportation_charge?.message}
                    />
                  </Flex>
                  <Textarea
                    disabled
                    style={{ width: "100%" }}
                    placeholder="Type detail..."
                    {...register("type_detail")}
                    error={errors.type_detail?.message}
                  />
                  <Textarea
                    disabled
                    style={{ width: "100%" }}
                    placeholder="Script detail..."
                    {...register("script_detail")}
                    error={errors.script_detail?.message}
                  />
                  <Flex align="center" gap="lg">
                    <TextInput
                      disabled
                      style={{ width: "50%" }}
                      placeholder="Number of scene"
                      {...register("scene_number")}
                      error={errors.scene_number?.message}
                    />
                    {file ? (
                      <Flex align="center" gap="lg" style={{ width: "50%" }}>
                        <Text>{file.name}</Text>
                        <ActionIcon
                          size="lg"
                          variant="filled"
                          color="red"
                          onClick={clearFile}
                        >
                          <IconTrash size={20} />
                        </ActionIcon>
                      </Flex>
                    ) : (
                      <Group style={{ width: "50%" }}>
                        <FileButton
                          disabled
                          resetRef={resetRef}
                          onChange={setFile}
                          accept="pdf"
                        >
                          {(props) => (
                            <Button
                              leftSection={<IconCloudUpload />}
                              {...props}
                            >
                              Upload Document
                            </Button>
                          )}
                        </FileButton>
                        <Button
                          disabled={!file}
                          color="red"
                          onClick={clearFile}
                        >
                          Reset
                        </Button>
                      </Group>
                    )}
                  </Flex>
                  <Flex align="center" gap="lg">
                    <TextInput
                      disabled
                      style={{ width: "50%" }}
                      placeholder="Contat person name"
                      {...register("contact_name")}
                      error={errors.contact_name?.message}
                    />
                    <TextInput
                      disabled
                      style={{ width: "50%" }}
                      placeholder="Contat person phone"
                      {...register("contact_phone")}
                      error={errors.contact_phone?.message}
                    />
                  </Flex>
                  <Controller
                    name="crew_list"
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        disabled
                        hidePickedOptions
                        label="Crew list"
                        style={{ width: "100%" }}
                        placeholder="Pick crews"
                        data={employees?.map((employee: Employee) => ({
                          label: employee.name,
                          value: employee.name,
                        }))}
                        {...field}
                        error={errors.crew_list?.message}
                      />
                    )}
                  />
                  <Flex align="center" gap="lg">
                    <Controller
                      name="photo_shooting_project"
                      control={control}
                      render={({ field }) => (
                        <Select
                          disabled
                          label="Photo shooting project"
                          style={{ width: "50%" }}
                          placeholder="Pick project"
                          data={projects?.map((project: Project) => ({
                            label: project.name,
                            value: project.name,
                          }))}
                          {...field}
                          error={errors.photo_shooting_project?.message}
                        />
                      )}
                    />
                    <Controller
                      name="video_shooting_project"
                      control={control}
                      render={({ field }) => (
                        <Select
                          disabled
                          label="Video shooting project"
                          style={{ width: "50%" }}
                          placeholder="Pick project"
                          data={projects?.map((project: Project) => ({
                            label: project.name,
                            value: project.name,
                          }))}
                          {...field}
                          error={errors.video_shooting_project?.message}
                        />
                      )}
                    />
                  </Flex>
                  <Flex align="center" gap="lg">
                    <Controller
                      name="arrive_office_on_time"
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          disabled
                          {...field}
                          label="Arrive office time"
                          error={errors.arrive_office_on_time?.message}
                          style={{ width: "50%" }}
                          value={field.value || ""} // Ensure value is defined
                          onChange={(time) => field.onChange(time)}
                          ref={refOfficeTime}
                          rightSection={pickerControlOfficeTime}
                        />
                      )}
                    />
                    <Controller
                      name="client"
                      control={control}
                      render={({ field }) => (
                        <Select
                          disabled
                          label="Client"
                          style={{ width: "50%" }}
                          placeholder="Pick client"
                          data={customers?.map((customer: Customer) => ({
                            label: customer.name,
                            value: customer.name,
                          }))}
                          {...field}
                          error={errors.client?.message}
                        />
                      )}
                    />
                  </Flex>
                  <Flex align="center" gap="lg">
                    <Controller
                      name="in_time"
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          disabled
                          {...field}
                          label="In time"
                          error={errors.in_time?.message}
                          style={{ width: "50%" }}
                          value={field.value || ""} // Ensure value is defined
                          onChange={(time) => field.onChange(time)}
                          ref={refInTime}
                          rightSection={pickerControlInTime}
                        />
                      )}
                    />
                    <Controller
                      name="out_time"
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          disabled
                          {...field}
                          label="Out time"
                          error={errors.out_time?.message}
                          style={{ width: "50%" }}
                          value={field.value || ""} // Ensure value is defined
                          onChange={(time) => field.onChange(time)}
                          ref={refOutTime}
                          rightSection={pickerControlOutTime}
                        />
                      )}
                    />
                  </Flex>
                  <Textarea
                    disabled
                    {...register("project_details")}
                    style={{ width: "100%" }}
                    label="Project details"
                    placeholder="Enter project details"
                    error={errors.project_details?.message}
                  />

                  {items?.length > 0 && (
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>No</Table.Th>
                          <Table.Th>Accessory Name</Table.Th>
                          <Table.Th>Required Quantity</Table.Th>
                          <Table.Th>Taken Quantity</Table.Th>
                          <Table.Th>Returned Quantity</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {items.map((item, i) => (
                          <Table.Tr key={i}>
                            <Table.Td>{++i}</Table.Td>
                            <Table.Td>{item.accessory_name}</Table.Td>
                            <Table.Td>{item.required_qty}</Table.Td>
                            <Table.Td>{item.taken_qty}</Table.Td>
                            <Table.Td>{item.returned_qty}</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  )}
                </React.Fragment>
              )}
            </Stack>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default TaskDetail;
