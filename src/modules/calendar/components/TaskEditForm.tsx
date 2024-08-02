import {
  Box,
  Button,
  Flex,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Customer,
  Highlight,
  Item,
  Project,
  Task,
  taskFormSchema,
  TTaskFormSchema,
} from "../types";
import { FC, useEffect, useRef, useState } from "react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useGetAllEmployees } from "../../employee/hooks/useGetAllEmployees";
import { Employee } from "../../project/types";
import { useStartTime } from "../hooks/time/useStartTime";
import { useEndTime } from "../hooks/time/useEndTime";
import dayjs from "dayjs";
import { useUpdateTask } from "../hooks/useUpdateTask";
import ShootingForm from "./sub-forms/ShootingForm";
import DesignForm from "./sub-forms/DesignForm";
import FrontendForm from "./sub-forms/FrontendForm";
import BackendForm from "./sub-forms/BackendForm";
import UiUxForm from "./sub-forms/UiUxForm";
import TestingForm from "./sub-forms/TestingForm";
import DeploymentForm from "./sub-forms/DeploymentForm";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useGetProjectsByCustomerId } from "../../project/hooks/useGetProjectsByCustomerId";
import PhotoEditForm from "./sub-forms/PhotoEditForm";
import VideoEditForm from "./sub-forms/VideoEditForm";
import ContentManagementForm from "./sub-forms/ContentManagementForm";

interface TaskEditFormProps {
  assignedTask: Task;
  opened: boolean;
  close: () => void;
}

const TaskEditForm: FC<TaskEditFormProps> = ({
  opened,
  close,
  assignedTask,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TTaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  const customerId = useWatch({
    control,
    name: "customer_id",
  });

  const transportation_charge = Number(
    useWatch({
      control,
      name: "transportation_charge",
    })
  );

  const food_charge = Number(
    useWatch({
      control,
      name: "food_charge",
    })
  );
  const other_charge = Number(
    useWatch({
      control,
      name: "other_charge",
    })
  );

  useEffect(() => {
    const total = String(transportation_charge + food_charge + other_charge);
    setValue("total_charge", total);
  }, [transportation_charge, food_charge, other_charge, setValue]);

  const [items, setItems] = useState<Item[]>([]);
  const [highlight, setHighlight] = useState<Highlight[]>([]);
  const [taskType, setTaskType] = useState<string | null>("");
  const { data: customers } = useGetAllCustomers();
  const { data: projects } = useGetProjectsByCustomerId(customerId);
  const { data: employees } = useGetAllEmployees(
    assignedTask.user.company_id.toString()
  );
  const { user } = useAuth();
  const isEmployee = user?.role === "employee" ? true : false;

  const { mutate: updateTask, isPending } = useUpdateTask(assignedTask.id);

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
    if (file?.type !== "application/pdf") {
      resetRef.current?.();
    }
  };

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

  const handleRequiredQtyChange = (id: number, value: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, required_qty: value } : item
      )
    );
  };

  const onSubmit = (values: TTaskFormSchema) => {
    let fileKey = {};
    if (file) {
      switch (taskType) {
        case "Graphic Design":
          fileKey = { reference_photo: file };
          break;
        case "Shooting":
          fileKey = { document: file };
          break;
      }
    }

    //shooting
    if (taskType === "Shooting" && items.length < 1) {
      toast.error("Please add shooting accessories");
      return;
    }

    //video editing
    if (taskType === "VideoEditing" && highlight.length < 1) {
      toast.error("Please add highlight");
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
      if (taskType === "Deployment") {
        return {
          apk_released_if_mobile: values.apk_released_if_mobile ? 1 : 0,
          sent_to_customer_if_mobile: values.sent_to_customer_if_mobile ? 1 : 0,
        };
      }
      if (taskType === "VideoEditing") {
        return {
          project_start_date: dayjs(values.project_start_date).format(
            "YYYY-MM-DD"
          ),
          draft_deadline: dayjs(values.draft_deadline).format("YYYY-MM-DD"),
          final_deadline: dayjs(values.final_deadline).format("YYYY-MM-DD"),
          high_light: JSON.stringify(
            highlight.map((highlight) => ({
              time: highlight.time,
              description: highlight.description,
              remark: highlight.remark,
            }))
          ),
        };
      }
      if (taskType === "PhotoEditing") {
        return {
          project_start_date: dayjs(values.project_start_date).format(
            "YYYY-MM-DD"
          ),
          draft_deadline: dayjs(values.draft_deadline).format("YYYY-MM-DD"),
          final_deadline: dayjs(values.final_deadline).format("YYYY-MM-DD"),
        };
      }
      if (taskType === "ContentManagement") {
        return {
          notify_date: dayjs(values.notify_date).format("YYYY-MM-DD"),
        };
      }
    })();

    //removing fields if not Deployment
    const filteredValues: Partial<TTaskFormSchema> = { ...values };
     //this mutates the origin values
     if (taskType !== "Deployment") {
      delete filteredValues.apk_released_if_mobile;
      delete filteredValues.sent_to_customer_if_mobile;
    }
    if (taskType !== "Shooting") {
      delete filteredValues.transportation_charge;
      delete filteredValues.food_charge;
      delete filteredValues.other_charge;
      delete filteredValues.total_charge;
    }

    const data = {
      ...filteredValues,
      ...fileKey,
      ...dynamicValues, //for all task types
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key as keyof TTaskFormSchema] as string);
    }

    updateTask(formData, {
      onSuccess: () => {
        close();
        setFile(null);
        setItems([]);
        setHighlight([]);
        toast.success("Task Updated Successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      },
    });
  };

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
      if (assignedTask.uiUxData) {
        setTaskType("UiUx");
      }
      if (assignedTask.testingData) {
        setTaskType("Testing");
      }
      if (assignedTask.deployment) {
        setTaskType("Deployment");
      }
      if (assignedTask.photoEditingData) {
        setTaskType("PhotoEditing");
      }
      if (assignedTask.videoEditingData) {
        setTaskType("VideoEditing");
      }
      if (assignedTask.contentManagementData) {
        setTaskType("ContentManagement");
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
        setValue("brand", assignedTask.designData.brand || "");
        setValue("type_of_media", assignedTask.designData.type_of_media || "");
        setValue(
          "designer_id",
          assignedTask.designData.designer_id.toString() || ""
        );
        setValue(
          "content_writer_id",
          assignedTask?.designData?.content_writer_id.toString() || ""
        );
        setValue("visual_copy", assignedTask.designData.visual_copy || "");
        setValue("headline", assignedTask.designData.headline || "");
        setValue("deadline", new Date(assignedTask.designData.deadline));
        setValue("body", assignedTask.designData.body);
        setValue("objective", assignedTask.designData.objective || "");
        setValue("important_info", assignedTask.designData.important_info);
        setValue("taste_style", assignedTask.designData.taste_style || "");
        setValue(
          "visual_format",
          assignedTask.designData.artworkSizes.visual_format || ""
        );
        setValue(
          "aspect_ratio",
          assignedTask.designData.artworkSizes.aspect_ratio || ""
        );
        setValue("width", assignedTask.designData.artworkSizes.width);
        setValue("height", assignedTask.designData.artworkSizes.height);
        setValue(
          "resolution",
          assignedTask.designData.artworkSizes.resolution || ""
        );
        setValue("reference", assignedTask.designData.reference || "");
        setPreviewUrl(assignedTask.designData.imageURL || "");
      }

      //shooting
      if (assignedTask?.shootingData) {
        setValue("duration", assignedTask.shootingData.duration || "");
        setValue(
          "shooting_location",
          assignedTask.shootingData.shooting_location || ""
        );
        setValue("type", assignedTask.shootingData.type || "");
        setValue(
          "transportation_charge",
          assignedTask.shootingData.transportation_charge || "0"
        );
        setValue("food_charge", assignedTask.shootingData.food_charge || "0");
        setValue("other_charge", assignedTask.shootingData.other_charge || "0");
        setValue("total_charge", assignedTask.shootingData.total_charge || "0");
        setValue("shooting_description", assignedTask.shootingData.shooting_description || "");
        setValue("type_detail", assignedTask.shootingData.type_detail || "");
        setValue(
          "script_detail",
          assignedTask.shootingData.script_detail || ""
        );
        setValue("scene_number", assignedTask.shootingData.scene_number || "");
        setValue("contact_name", assignedTask.shootingData.contact_name || "");
        setValue("contact_phone", assignedTask.shootingData.contact_phone);
        setValue("crew_list", assignedTask.shootingData.crew_list || "");
        setValue(
          "photo_shooting_project",
          assignedTask.shootingData.photo_shooting_project || ""
        );
        setValue(
          "video_shooting_project",
          assignedTask.shootingData.video_shooting_project || ""
        );
        setValue(
          "arrive_office_on_time",
          assignedTask.shootingData.arrive_office_on_time || ""
        );
        setValue("client", assignedTask.shootingData.client || "");
        setValue("in_time", assignedTask.shootingData.in_time || "");
        setValue("out_time", assignedTask.shootingData.out_time || "");
        setValue(
          "project_details",
          assignedTask.shootingData.project_details || ""
        );
        setValue(
          "project_details",
          assignedTask.shootingData.project_details || ""
        );
        setItems(assignedTask.shootingData.shooting_accessories || []);
      }

      //frontend
      if (assignedTask?.frontEndData) {
        setValue("feature_type", assignedTask.frontEndData.feature_type || []);
        setValue(
          "reference_figma",
          assignedTask.frontEndData.reference_figma || ""
        );
        setValue("detail_task", assignedTask.frontEndData.detail_task || "");
        setValue(
          "design_validation_detail",
          assignedTask.frontEndData.design_validation_detail || ""
        );
        setValue(
          "styling_detail",
          assignedTask.frontEndData.styling_detail || ""
        );
        setValue(
          "api_integration",
          assignedTask.frontEndData.api_integration || ""
        );
      }

      //backend
      if (assignedTask?.backEndData) {
        setValue("use_case", assignedTask.backEndData.use_case || "");
        setValue("crud_type", assignedTask.backEndData.crud_type || "");
        setValue("detail", assignedTask.backEndData.detail || "");
        setValue(
          "database_migration",
          assignedTask.backEndData.database_migration || ""
        );
        setValue(
          "controller_name",
          assignedTask.backEndData.controller_name || ""
        );
        setValue("routes", assignedTask.backEndData.routes || "");
        setValue("related_view", assignedTask.backEndData.related_view || "");
      }

      //uiux
      if (assignedTask?.uiUxData) {
        setValue(
          "customer_requirement",
          assignedTask.uiUxData.customer_requirement || ""
        );
        setValue("ui_type", assignedTask.uiUxData.ui_type || "");
        setValue(
          "reference_platform",
          assignedTask.uiUxData.reference_platform || ""
        );
        setValue("ui_detail_task", assignedTask.uiUxData.ui_detail_task || "");
        setValue(
          "ui_styling_detail",
          assignedTask.uiUxData.ui_styling_detail || ""
        );
        setValue("total_ui_screen", assignedTask.uiUxData.total_ui_screen || 0);
        setValue(
          "confirmed_ui_screen",
          assignedTask.uiUxData.confirmed_ui_screen || 0
        );
      }

      //testing
      if (assignedTask.testingData) {
        setValue("testing_type", assignedTask.testingData.testing_type || "");
        setValue(
          "initial_test_brief",
          assignedTask.testingData.initial_test_brief || ""
        );
        setValue(
          "testing_issues",
          assignedTask.testingData.testing_issues || ""
        );
        setValue(
          "testing_overall",
          assignedTask.testingData.testing_overall || ""
        );
        setValue(
          "customer_comment",
          assignedTask.testingData.customer_comment || ""
        );
      }

      //deployment
      if (assignedTask.deployment) {
        setValue(
          "deployment_type",
          assignedTask.deployment.deployment_type || ""
        );
        setValue("server_type", assignedTask.deployment.server_type || "");
        setValue(
          "deployment_brief",
          assignedTask.deployment.deployment_brief || ""
        );
        setValue("instance_name", assignedTask.deployment.instance_name || "");
        setValue("configuration", assignedTask.deployment.configuration || "");
        setValue("db_type", assignedTask.deployment.db_type || "");
        setValue("ip_and_port", assignedTask.deployment.ip_and_port);
        setValue("username", assignedTask.deployment.username || "");
        setValue("project_type", assignedTask.deployment.project_type);
        setValue("dev_type", assignedTask.deployment.dev_type || "");
        setValue("sub_domain", assignedTask.deployment.sub_domain || "");
        setValue(
          "deployment_issues",
          assignedTask.deployment.deployment_issues || ""
        );
        setValue(
          "deployment_overall",
          assignedTask.deployment.deployment_overall || ""
        );
      }

      if (assignedTask.photoEditingData) {
        setValue("brand_name", assignedTask.photoEditingData.brand_name);
        setValue("project_title", assignedTask.photoEditingData.project_title);
        setValue(
          "project_start_date",
          new Date(assignedTask.photoEditingData.project_start_date)
        );
        setValue(
          "draft_deadline",
          new Date(assignedTask.photoEditingData.draft_deadline)
        );
        setValue(
          "final_deadline",
          new Date(assignedTask.photoEditingData.final_deadline)
        );
        setValue(
          "account_executive",
          assignedTask.photoEditingData.account_executive || ""
        );
        setValue(
          "photo_retoucher",
          assignedTask.photoEditingData.photo_retoucher || []
        );
        setValue(
          "project_description",
          assignedTask.photoEditingData.project_description || ""
        );
        setValue(
          "client_request_detail",
          assignedTask.photoEditingData.client_request_detail || ""
        );
        setValue(
          "number_of_retouch_photos",
          assignedTask.photoEditingData.number_of_retouch_photos || 0
        );
        setValue(
          "color_grade",
          assignedTask.photoEditingData.color_grade || ""
        );
        setValue(
          "editing_style",
          assignedTask.photoEditingData.editing_style || ""
        );
        setValue("remark", assignedTask.photoEditingData.remark || "");
        setValue(
          "editing_reference",
          assignedTask.photoEditingData.editing_reference || ""
        );
      }

      if (assignedTask.videoEditingData) {
        setValue("brand_name", assignedTask.videoEditingData.brand_name || "");
        setValue(
          "project_title",
          assignedTask.videoEditingData.project_title || ""
        );
        setValue(
          "project_start_date",
          new Date(assignedTask.videoEditingData.project_start_date)
        );
        setValue(
          "draft_deadline",
          new Date(assignedTask.videoEditingData.draft_deadline)
        );
        setValue(
          "final_deadline",
          new Date(assignedTask.videoEditingData.final_deadline)
        );
        setValue(
          "account_executive",
          assignedTask.videoEditingData.account_executive || ""
        );
        setValue(
          "video_editor",
          assignedTask.videoEditingData.video_editor || []
        );
        setValue(
          "project_description",
          assignedTask.videoEditingData.project_description || ""
        );
        setValue(
          "client_request_detail",
          assignedTask.videoEditingData.client_request_detail || ""
        );
        setValue(
          "color_grade",
          assignedTask.videoEditingData.color_grade || ""
        );
        setValue(
          "editing_style",
          assignedTask.videoEditingData.editing_style || ""
        );
        setValue(
          "motion_text_effect",
          assignedTask.videoEditingData.motion_text_effect || ""
        );
        setValue(
          "three_d_animation",
          assignedTask.videoEditingData.three_d_animation || ""
        );
        setHighlight(assignedTask.videoEditingData.high_light || []);
      }
      if (assignedTask.contentManagementData) {
        setValue(
          "content_title",
          assignedTask.contentManagementData.content_title || ""
        );
        setValue(
          "content_description",
          assignedTask.contentManagementData.content_description || ""
        );
        setValue(
          "notify_date",
          new Date(assignedTask.contentManagementData.notify_date)
        );
        setValue(
          "notify_time",
          assignedTask.contentManagementData.notify_time || ""
        );
      }
    }
  }, [assignedTask, setValue]);

  return (
    <Box>
      <Modal
        size={700}
        padding={30}
        opened={opened}
        onClose={close}
        title="Edit Task Form"
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
                        disabled={isEmployee}
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
                        disabled={isEmployee}
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
                        disabled={isEmployee}
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
                        disabled={isEmployee}
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
                        disabled={isEmployee}
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
                        disabled={isEmployee}
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
                      disabled={isEmployee}
                      label="Employee"
                      style={{ width: "100%" }}
                      placeholder="Pick employee"
                      data={
                        employees?.map((employee: Employee) => ({
                          label: employee.name,
                          value: employee.id.toString(),
                        })) || []
                      }
                      {...field}
                      error={errors.user_id?.message}
                    />
                  )}
                />
                {/* dynamically rendered forms */}
                {/* graphic design */}
                {taskType === "Graphic Design" && (
                  <DesignForm
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
                    isEdit={true}
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
                    handleRequiredQtyChange={handleRequiredQtyChange}
                  />
                )}
                {taskType === "Frontend" && (
                  <FrontendForm
                    errors={errors}
                    register={register}
                    control={control}
                  />
                )}
                {taskType === "Backend" && (
                  <BackendForm errors={errors} register={register} />
                )}
                {taskType === "UiUx" && (
                  <UiUxForm
                    control={control}
                    register={register}
                    errors={errors}
                  />
                )}
                {taskType === "Testing" && (
                  <TestingForm
                    checked={
                      assignedTask.testingData?.customer_comment ? true : false
                    }
                    control={control}
                    register={register}
                    errors={errors}
                  />
                )}
                {taskType === "Deployment" && (
                  <DeploymentForm
                    control={control}
                    errors={errors}
                    register={register}
                  />
                )}
                {taskType === "PhotoEditing" && (
                  <PhotoEditForm
                    control={control}
                    register={register}
                    errors={errors}
                    employees={employees}
                  />
                )}
                {taskType === "VideoEditing" && (
                  <VideoEditForm
                    highlight={highlight}
                    setHighlight={setHighlight}
                    control={control}
                    register={register}
                    errors={errors}
                    employees={employees}
                  />
                )}
                {taskType === "ContentManagement" && (
                  <ContentManagementForm
                    control={control}
                    register={register}
                    errors={errors}
                  />
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
                  Update
                </Button>
              </Flex>
            </form>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default TaskEditForm;
