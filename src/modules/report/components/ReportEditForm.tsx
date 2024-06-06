import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Image,
  Modal,
  Select,
  Slider,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconCloudUpload,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FC, useEffect, useRef, useState } from "react";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { useGetReport } from "../hooks/useGetReport";
import {
  Customer,
  Project,
  reportFormSchema,
  TReportFormSchema,
} from "../types";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useGetAllProjects } from "../../project/hooks/useGetAllProjects";
import { useGetAllTasks } from "../../calendar/hooks/useGetAllTasks";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { Task } from "../../calendar/types";
import { useReportTime } from "../hooks/useReportTime";
import dayjs from "dayjs";

interface ReportEditFormProps {
  id: number;
}

const ReportEditForm: FC<ReportEditFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAuth();
  const { data: customers } = useGetAllCustomers();
  const { data: projects } = useGetAllProjects();
  const { data: assignedTasks } = useGetAllTasks();
  const { mutate: updateReport, isPending } = useUpdateReport(id);
  const { data: report } = useGetReport(id);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [doc, setDoc] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const resetPhotoRef = useRef<() => void>(null);
  const resetVideoRef = useRef<() => void>(null);

  const { refReportTime, pickerControlReportTime } = useReportTime();

  const clearDoc = () => {
    setDoc(null);
  };

  const clearVideo = () => {
    setVideo(null);
    resetVideoRef.current?.();
  };

  const clearPhoto = () => {
    setPhoto(null);
    resetPhotoRef.current?.();
  };

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreviewUrl(objectUrl);

      // Clean up to revoke the object URL when the component unmounts or when the file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // Reset the previewUrl to null if no file is provided
      setPreviewUrl(null);
    }
  }, [photo]); // Re-generate preview URL whenever the file changes

  useEffect(() => {
    if (video) {
      const objectUrl = URL.createObjectURL(video);
      setVideoPreviewUrl(objectUrl);

      // Clean up to revoke the object URL when the component unmounts or when the file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // Reset the videoPreviewUrl to null if no file is provided
      setVideoPreviewUrl(null);
    }
  }, [video]); // Re-generate preview URL whenever the file changes

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TReportFormSchema>({
    resolver: zodResolver(reportFormSchema),
  });

  const onSubmit = (values: TReportFormSchema) => {
    const data = {
      ...values,
      report_date: dayjs(values.report_date).format("YYYY-MM-DD"),
      attachment_path: doc,
      photo_path: photo,
      video_path: video,
      user_id: user?.id,
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key as keyof TReportFormSchema] as string);
    }
    updateReport(formData, {
      onSuccess: () => {
        close();
        toast.success("Report updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    if (report) {
      setValue("customer_id", report.task.customer_id.toString());
      setValue("project_id", report.task.project_id.toString());
      setValue("assigned_task_id", report.task.id.toString());
      setValue("status", report.task.status);
      setValue("progress", report.progress);
      setValue("progress_description", report.progress_description);
      setPreviewUrl(report.imageUrl);
      setVideoPreviewUrl(report.videoUrl);
      setValue("report_date", new Date(report.report_date));
      setValue("report_time", report.report_time);
    }
  }, [setValue, report]);

  return (
    <Box>
      <Modal
        size={600}
        opened={opened}
        onClose={close}
        title="Edit Report Task Form"
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
            <Stack>
              <Controller
                name="assigned_task_id"
                control={control}
                disabled
                render={({ field }) => (
                  <Select
                    label="Task"
                    style={{ width: "100%" }}
                    placeholder="Pick task"
                    data={assignedTasks?.map((task: Task) => ({
                      label: task.title,
                      value: task.id.toString(),
                    }))}
                    {...field}
                    error={errors.assigned_task_id?.message}
                  />
                )}
              />
              <Controller
                name="customer_id"
                control={control}
                disabled
                render={({ field }) => (
                  <Select
                    label="Customer"
                    style={{ width: "100%" }}
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
                disabled
                render={({ field }) => (
                  <Select
                    label="Project"
                    style={{ width: "100%" }}
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
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Status"
                    style={{ width: "100%" }}
                    placeholder="Pick company"
                    data={["pending", "inProgress", "done"]}
                    {...field}
                    error={errors.status?.message}
                  />
                )}
              />
              <Flex direction="column" gap={2}>
                <Text fz={14} fw={500}>
                  Progress
                </Text>
                <Controller
                  name="progress"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      label={(value) => value}
                      value={field.value}
                      onChange={(value) => {
                        if (report?.progress && report.progress > value) return;
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Flex>
              <TextInput
                error={errors.progress_description?.message}
                label="Description"
                placeholder="Enter description"
                {...register("progress_description")}
              />
              {doc ? (
                <Flex align="center" gap="lg" style={{ width: "100%" }}>
                  <Text>{doc.name}</Text>
                  <ActionIcon
                    size="lg"
                    variant="filled"
                    color="red"
                    onClick={clearDoc}
                  >
                    <IconTrash size={20} />
                  </ActionIcon>
                </Flex>
              ) : (
                <Group style={{ width: "100%" }}>
                  <FileButton onChange={setDoc} accept="application/pdf">
                    {(props) => (
                      <Button
                        w={200}
                        leftSection={<IconCloudUpload />}
                        {...props}
                      >
                        Upload Document
                      </Button>
                    )}
                  </FileButton>
                </Group>
              )}
              {previewUrl && <Image radius="md" src={previewUrl} />}
              <Group style={{ width: "100%" }}>
                <FileButton
                  resetRef={resetPhotoRef}
                  onChange={setPhoto}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <Button
                      w={200}
                      leftSection={<IconCloudUpload />}
                      {...props}
                    >
                      Upload image
                    </Button>
                  )}
                </FileButton>
                <Button disabled={!photo} color="red" onClick={clearPhoto}>
                  Reset
                </Button>
              </Group>
              {videoPreviewUrl && (
                <video width="100%" controls>
                  <source src={videoPreviewUrl} type={video?.type} />
                  Your browser does not support the video tag.
                </video>
              )}
              <Group style={{ width: "100%" }}>
                <FileButton
                  resetRef={resetVideoRef}
                  onChange={setVideo}
                  accept="video/*"
                >
                  {(props) => (
                    <Button
                      w={200}
                      leftSection={<IconCloudUpload />}
                      {...props}
                    >
                      Upload Video
                    </Button>
                  )}
                </FileButton>
                <Button disabled={!video} color="red" onClick={clearVideo}>
                  Reset
                </Button>
              </Group>
              <Flex align="center" gap="lg">
                <Controller
                  name="report_date"
                  control={control}
                  render={({ field }) => (
                    <DatePickerInput
                      error={errors.report_date?.message}
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
                  name="report_time"
                  control={control}
                  render={({ field }) => (
                    <TimeInput
                      {...field}
                      label="Start time"
                      error={errors.report_time?.message}
                      style={{ width: "50%" }}
                      value={field.value || ""} // Ensure value is defined
                      onChange={(time) => field.onChange(time)}
                      ref={refReportTime}
                      rightSection={pickerControlReportTime}
                    />
                  )}
                />
              </Flex>
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
      </Modal>
      <IconEdit
        onClick={open}
        style={{ color: "#4361ee", cursor: "pointer" }}
      />
    </Box>
  );
};

export default ReportEditForm;
