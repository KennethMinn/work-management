import {
  Box,
  Flex,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
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
import { FC, useEffect, useRef, useState } from "react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useGetAllProjects } from "../../project/hooks/useGetAllProjects";
import { useGetAllEmployees } from "../../employee/hooks/useGetAllEmployees";
import { Employee } from "../../project/types";
import { useStartTime } from "../../calendar/hooks/time/useStartTime";
import { useEndTime } from "../../calendar/hooks/time/useEndTime";
import DesignForm from "../../calendar/components/sub-forms/DesignForm";
import ShootingForm from "../../calendar/components/sub-forms/ShootingForm";
import FrontendForm from "../../calendar/components/sub-forms/FrontendForm";
import BackendForm from "../../calendar/components/sub-forms/BackendForm";

interface TaskDetailProp {
  assignedTask: Task;
  opened: boolean;
  close: () => void;
}

const TaskDetail: FC<TaskDetailProp> = ({ opened, close, assignedTask }) => {
  const isDetail = true;
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
      if (assignedTask.frontEndData) {
        setTaskType("Frontend");
      }
      if (assignedTask.backEndData) {
        setTaskType("Backend");
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

      //frontend
      if (assignedTask?.frontEndData) {
        setValue("feature_type", assignedTask.frontEndData.feature_type);
        setValue("reference_figma", assignedTask.frontEndData.reference_figma);
        setValue("detail_task", assignedTask.frontEndData.detail_task);
        setValue(
          "design_validation_detail",
          assignedTask.frontEndData.design_validation_detail
        );
        setValue("styling_detail", assignedTask.frontEndData.styling_detail);
        setValue("api_integration", assignedTask.frontEndData.api_integration);
      }

      //backend
      if (assignedTask?.backEndData) {
        setValue("use_case", assignedTask.backEndData.use_case);
        setValue("crud_type", assignedTask.backEndData.crud_type);
        setValue("detail", assignedTask.backEndData.detail);
        setValue(
          "database_migration",
          assignedTask.backEndData.database_migration
        );
        setValue("controller_name", assignedTask.backEndData.controller_name);
        setValue("routes", assignedTask.backEndData.routes);
        setValue("related_view", assignedTask.backEndData.related_view);
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
                <DesignForm
                  isDetail={isDetail}
                  previewUrl={previewUrl}
                  errors={errors}
                  register={register}
                  control={control}
                  file={file}
                  setFile={setFile}
                  resetRef={resetRef}
                  clearFile={clearFile}
                  employees={employees}
                />
              )}
              {taskType === "Shooting" && (
                <ShootingForm
                  isDetail={isDetail}
                  assignedTask={assignedTask}
                  errors={errors}
                  register={register}
                  control={control}
                  file={file}
                  setFile={setFile}
                  resetRef={resetRef}
                  clearFile={clearFile}
                  items={items}
                  setItems={setItems}
                  customers={customers}
                  projects={projects}
                  employees={employees}
                />
              )}
              {taskType === "Frontend" && (
                <FrontendForm
                  isDetail={isDetail}
                  errors={errors}
                  register={register}
                  control={control}
                />
              )}
              {taskType === "Backend" && (
                <BackendForm
                  isDetail={isDetail}
                  errors={errors}
                  register={register}
                />
              )}
            </Stack>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default TaskDetail;
