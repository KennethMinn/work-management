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
import {
  IconCalendar,
  IconCloudUpload,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { Customer, Project, taskFormSchema, TTaskFormSchema } from "../types";
import React, { FC, useEffect, useRef, useState } from "react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useGetAllProjects } from "../../project/hooks/useGetAllProjects";
import { useGetAllEmployees } from "../../employee/hooks/useGetAllEmployees";
import { Employee } from "../../project/types";
import { useStartTime } from "../hooks/time/useStartTime";
import { useEndTime } from "../hooks/time/useEndTime";
import { useCreateTask } from "../hooks/useCreateTask";
import { useOfficeTime } from "../hooks/time/useOfficeTime";
import { useInTime } from "../hooks/time/useInTime";
import { useOutTime } from "../hooks/time/useOutTime";
import { useGetAllShootingCategories } from "../../shooting-category/hooks/useGetAllShootingCategories";
import {
  ShootingAccessoriesDataRow,
  ShootingCategory,
} from "../../shooting-accessories/types";
import useGetShootingAccessoriesByCategoryId from "../../shooting-accessories/hooks/useGetShootingAccessoriesByCategoryId";
import dayjs from "dayjs";

interface TaskCreateFormProps {
  start: Date | undefined;
  opened: boolean;
  close: () => void;
}

interface Item {
  id: number;
  accessory_name: string | null;
  required_qty: string;
  taken_qty: string;
  returned_qty: string;
}

const TaskCreateForm: FC<TaskCreateFormProps> = ({ opened, close, start }) => {
  const [taskType, setTaskType] = useState<string | null>("");
  const { mutate: createTask, isPending } = useCreateTask();
  const { data: customers } = useGetAllCustomers();
  const { data: projects } = useGetAllProjects();
  const { data: employees } = useGetAllEmployees();

  //category and accessories
  /*  
  [
    {
      accessory_name : 'accessory 1',
      required_qty : '0',
      taken_qty : '0',
      returned_qty : '0',
    }
  ]
  */
  const [items, setItems] = useState<Item[]>([]);
  const [qty, setQty] = useState("");
  const [shootingCategory, setShootingCategory] = useState<string | null>(null);
  const [shootingAccessory, setShootingAccessory] = useState<string | null>(
    null
  );
  const { data: shootingCategories } = useGetAllShootingCategories("visible");
  const { data: shootingAccessories } = useGetShootingAccessoriesByCategoryId(
    shootingCategory!
  );

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
    handleSubmit,
    reset,
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

  const onAddAccessories = () => {
    if (!shootingCategory || !shootingAccessory || !qty) {
      return;
    }
    const newItem = {
      id: Date.now(),
      accessory_name: shootingAccessory,
      required_qty: qty,
      taken_qty: "0",
      returned_qty: "0",
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const onSubmit = (values: TTaskFormSchema) => {
    let fileKey = {};
    let fileType;
    switch (taskType) {
      case "Graphic Design":
        fileKey = { reference_photo: file };
        fileType = "reference photo";
        break;
      case "Shooting":
        fileKey = { document: file };
        fileType = "document";
        break;
    }

    if (!file) {
      toast.error(`Please Add ${fileType}`);
      return;
    }

    //shootinig
    if (taskType === "Shooting" && items.length < 1) {
      toast.error("Please add shooting accessories");
      return;
    }

    const dynamicValues = (() => {
      if (taskType === "Graphic Design") {
        return {
          deadline: dayjs(values.deadline).format("YYYY-MM-DD"),
        };
      }
      if (taskType === "Shooting") {
        return {
          crew_list: values.crew_list,
          shooting_accessories: JSON.stringify(
            items.map((item) => ({
              accessory_name: item.accessory_name,
              required_qty: item.required_qty,
              taken_qty: item.taken_qty,
              returned_qty: item.returned_qty,
            }))
          ),
        };
      }
    })();

    const data = {
      ...values,
      ...fileKey,
      ...dynamicValues, //for all task types
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key as keyof TTaskFormSchema] as string);
    }

    createTask(formData, {
      onSuccess: () => {
        reset();
        close();
        setFile(null);
        setItems([]);
        toast.success("Task Created Successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
        setItems([]);
        reset();
      },
    });
  };

  useEffect(() => {
    setValue("start_date", start!);
  }, [start, setValue]);

  useEffect(() => {
    setShootingAccessory(null);
  }, [shootingCategory]);

  useEffect(() => {
    setFile(null);
  }, [taskType]);

  return (
    <Box>
      <Modal
        size={650}
        padding={30}
        opened={opened}
        onClose={close}
        title="Create Task Form"
        centered
        styles={{
          title: {
            fontSize: "20px",
            fontWeight: 600,
          },
        }}
      >
        <Box my={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              {/* default forms */}
              <TextInput
                label="Task title"
                style={{ width: "100%" }}
                placeholder="Enter task title"
                {...register("title")}
                error={errors.title?.message}
              />
              <Textarea
                {...register("description")}
                style={{ width: "100%" }}
                label="Task description"
                placeholder="description"
                error={errors.description?.message}
              />
              <TextInput
                label="Meeting link"
                style={{ width: "100%" }}
                placeholder="Enter meeting link"
                {...register("meeting_link")}
                error={errors.meeting_link?.message}
              />
              <TextInput
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
              <Flex align="center" gap="lg">
                <Controller
                  name="user_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Employee"
                      style={{ width: "50%" }}
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
                <Select
                  label="Task type"
                  value={taskType}
                  onChange={setTaskType}
                  style={{ width: "50%" }}
                  placeholder="Pick task"
                  data={["Graphic Design", "Shooting"]}
                />
              </Flex>

              {/* dynamically rendered forms */}
              {/* graphic design */}
              {taskType === "Graphic Design" && (
                <React.Fragment>
                  <Flex align="center" gap="lg">
                    <TextInput
                      label="Brand"
                      style={{ width: "50%" }}
                      placeholder="Enter brand"
                      {...register("brand")}
                      error={errors.brand?.message}
                    />
                    <TextInput
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
                      label="Body"
                      style={{ width: "50%" }}
                      placeholder="Enter body"
                      {...register("body")}
                      error={errors.body?.message}
                    />
                    <TextInput
                      label="Objective"
                      style={{ width: "50%" }}
                      placeholder="Enter objectice"
                      {...register("objective")}
                      error={errors.objective?.message}
                    />
                  </Flex>
                  <Flex align="center" gap="lg">
                    <TextInput
                      label="Important information"
                      style={{ width: "50%" }}
                      placeholder="Enter important information"
                      {...register("important_info")}
                      error={errors.important_info?.message}
                    />
                    <TextInput
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
                          style={{ width: "100%" }}
                          placeholder="Visual format"
                          {...register("visual_format")}
                          error={errors.visual_format?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          style={{ width: "100%" }}
                          placeholder="Aspect ratio"
                          {...register("aspect_ratio")}
                          error={errors.aspect_ratio?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          style={{ width: "100%" }}
                          placeholder="Width"
                          {...register("width")}
                          error={errors.width?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
                          style={{ width: "100%" }}
                          placeholder="Height"
                          {...register("height")}
                          error={errors.height?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={2.4}>
                        <TextInput
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
                    label="Duration"
                    style={{ width: "100%" }}
                    placeholder="Enter duration"
                    {...register("duration")}
                    error={errors.duration?.message}
                  />
                  <TextInput
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
                      style={{ width: "50%" }}
                      placeholder="Enter transportation"
                      {...register("transportation_charge")}
                      error={errors.transportation_charge?.message}
                    />
                  </Flex>

                  <Flex align="center" gap="lg">
                    <Textarea
                      style={{ width: "50%" }}
                      placeholder="Type detail..."
                      {...register("type_detail")}
                      error={errors.type_detail?.message}
                    />
                    <Textarea
                      style={{ width: "50%" }}
                      placeholder="Script detail..."
                      {...register("script_detail")}
                      error={errors.script_detail?.message}
                    />
                  </Flex>
                  <Flex align="center" gap="lg">
                    <TextInput
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
                      style={{ width: "50%" }}
                      placeholder="Contat person name"
                      {...register("contact_name")}
                      error={errors.contact_name?.message}
                    />
                    <TextInput
                      style={{ width: "50%" }}
                      placeholder="Contat person phone"
                      {...register("contact_phone")}
                      error={errors.contact_phone?.message}
                    />
                  </Flex>
                  <Flex align="center" gap="lg">
                    <Controller
                      name="client"
                      control={control}
                      render={({ field }) => (
                        <Select
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
                      name="photo_shooting_project"
                      control={control}
                      render={({ field }) => (
                        <Select
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
                      name="crew_list"
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          hidePickedOptions
                          label="Crew list"
                          style={{ width: "50%" }}
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
                  </Flex>
                  <Flex align="center" gap="lg">
                    <Controller
                      name="in_time"
                      control={control}
                      render={({ field }) => (
                        <TimeInput
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
                    {...register("project_details")}
                    style={{ width: "100%" }}
                    label="Project details"
                    placeholder="Enter project details"
                    error={errors.project_details?.message}
                  />
                  <Grid>
                    <Grid.Col span={3.3}>
                      <Select
                        value={shootingCategory}
                        onChange={setShootingCategory}
                        label="Shooting category"
                        style={{ width: "100%" }}
                        placeholder="Pick category"
                        data={shootingCategories?.map(
                          (shootingCategory: ShootingCategory) => ({
                            label: shootingCategory.name,
                            value: shootingCategory.id.toString(),
                          })
                        )}
                        error={errors.photo_shooting_project?.message}
                      />
                    </Grid.Col>
                    <Grid.Col span={3.3}>
                      <Select
                        label="Shooting category"
                        style={{ width: "100%" }}
                        disabled={shootingCategory === null}
                        value={shootingAccessory}
                        onChange={setShootingAccessory}
                        placeholder="Pick category"
                        data={shootingAccessories?.map(
                          (shootingAccessory: ShootingAccessoriesDataRow) => ({
                            label: shootingAccessory.name,
                            value: shootingAccessory.name,
                          })
                        )}
                        error={errors.photo_shooting_project?.message}
                      />
                    </Grid.Col>
                    <Grid.Col span={3.3}>
                      <TextInput
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        label="quantity"
                        style={{ width: "100%" }}
                        placeholder="Enter task title"
                        error={errors.title?.message}
                      />
                    </Grid.Col>
                    <Grid.Col span={1} mt={25}>
                      <Button
                        onClick={onAddAccessories}
                        leftSection={<IconPlus size={20} />}
                      >
                        Add
                      </Button>
                    </Grid.Col>
                  </Grid>
                  {items.length > 0 && (
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
                            <Table.Td>
                              <IconTrash
                                onClick={() =>
                                  setItems((prevItems) =>
                                    prevItems.filter(
                                      (prevItem) => prevItem.id !== item.id
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
              )}
            </Stack>
            <Flex justify="end" gap={15} mt={20}>
              <Button radius={4} size="sm" onClick={close} color="dark">
                Cancel
              </Button>
              <Button
                type="submit"
                radius={4}
                size="sm"
                loading={isPending}
                disabled={isPending}
                color="blue"
              >
                Create
              </Button>
            </Flex>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskCreateForm;
