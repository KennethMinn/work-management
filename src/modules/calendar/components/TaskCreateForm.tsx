import {
  Box,
  Button,
  Flex,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import {
  Customer,
  Item,
  Project,
  taskFormSchema,
  TTaskFormSchema,
} from "../types";
import { FC, useEffect, useRef, useState } from "react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useGetAllProjects } from "../../project/hooks/useGetAllProjects";
import { useGetAllEmployees } from "../../employee/hooks/useGetAllEmployees";
import { Employee } from "../../project/types";
import { useStartTime } from "../hooks/time/useStartTime";
import { useEndTime } from "../hooks/time/useEndTime";
import { useCreateTask } from "../hooks/useCreateTask";

import dayjs from "dayjs";
import BackendForm from "./sub-forms/BackendForm";
import FrontendForm from "./sub-forms/FrontendForm";
import ShootingForm from "./sub-forms/ShootingForm";
import DesignForm from "./sub-forms/DesignForm";
import { useGetAllCompanies } from "../../company/hooks/useGetAllCompanies";
import { Company } from "../../employee/types";
import { useGetTaskTypes } from "../../task-type/hooks/useGetTaskTypes";
import { TaskType } from "../../task-type/types";
import UiUxForm from "./sub-forms/UiUxForm";

interface TaskCreateFormProps {
  start: Date | undefined;
  opened: boolean;
  close: () => void;
}

const TaskCreateForm: FC<TaskCreateFormProps> = ({ opened, close, start }) => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [taskType, setTaskType] = useState<string | null>(null);
  const { mutate: createTask, isPending } = useCreateTask();
  const { data: customers } = useGetAllCustomers();
  const { data: projects } = useGetAllProjects();
  const { data: employees } = useGetAllEmployees(companyId!);
  const { data: companies } = useGetAllCompanies();
  const { data: taskTypes } = useGetTaskTypes(companyId!);
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

  const onSubmit = (values: TTaskFormSchema) => {
    let fileKey = {};
    let fileType;
    if (taskType === "Shooting" || taskType === "Graphic Design") {
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
    }

    if ((taskType === "Shooting" || taskType === "Graphic Design") && !file) {
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
      },
    });
  };

  useEffect(() => {
    setValue("start_date", start!);
  }, [start, setValue]);

  useEffect(() => {
    setFile(null);
  }, [taskType]);

  useEffect(() => {
    setTaskType(null);
  }, [companyId]);

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
              <Select
                label="Company"
                style={{ width: "100%" }}
                value={companyId}
                onChange={setCompanyId}
                placeholder="Pick Company"
                data={companies?.map((company: Company) => ({
                  label: company.name,
                  value: company.id.toString(),
                }))}
              />
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
                  disabled={!companyId}
                  value={taskType}
                  onChange={setTaskType}
                  style={{ width: "50%" }}
                  placeholder="Pick task"
                  data={taskTypes?.map((taskType: TaskType) => taskType.name)}
                />
              </Flex>

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
                  errors={errors}
                  register={register}
                  control={control}
                />
              )}
              {taskType === "Backend" && (
                <BackendForm errors={errors} register={register} />
              )}
              <UiUxForm control={control} register={register} errors={errors} />
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
