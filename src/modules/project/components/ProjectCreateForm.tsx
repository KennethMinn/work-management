import {
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconCloudUpload, IconPlus } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Customer,
  Employee,
  projectFormSchema,
  TProjectFormSchema,
} from "../types";
import { Controller, useForm } from "react-hook-form";
import { useCreateProject } from "../hooks/useCreateProject";
import { useRef, useState } from "react";
import { useGetAllCustomers } from "../../customer/hooks/useGetAllCustomers";
import { useGetAllEmployees } from "../../employee/hooks/useGetAllEmployees";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";

const ProjectCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createProject, isPending } = useCreateProject();
  const { data: customers } = useGetAllCustomers();
  const { data: employees } = useGetAllEmployees();

  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
  });

  const onSubmit = (values: TProjectFormSchema) => {
    if (!file) {
      toast.error("Please add document");
      return;
    }
    const data = {
      ...values,
      contract_date: dayjs(values.contract_date).format("YYYY-MM-DD"),
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      document: file,
    };
    const formData = new FormData();
    console.log(data);
    for (const key in data) {
      formData.append(key, data[key as keyof TProjectFormSchema] as string);
    }
    createProject(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Project Created Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  return (
    <Box>
      <Modal
        size={650}
        padding={30}
        opened={opened}
        onClose={close}
        title="Create Project Form"
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
              {file && (
                <Text size="sm" ta="center" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
              <Flex align="center" gap="lg">
                <Text w={170} fw={500}>
                  Document
                </Text>
                <Group style={{ width: "100%" }}>
                  <FileButton resetRef={resetRef} onChange={setFile}>
                    {(props) => (
                      <Button leftSection={<IconCloudUpload />} {...props}>
                        Upload doc
                      </Button>
                    )}
                  </FileButton>
                  <Button disabled={!file} color="red" onClick={clearFile}>
                    Reset
                  </Button>
                </Group>
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={170} fw={500}>
                  Name
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter project name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={170} fw={500}>
                  Description
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter description name"
                  {...register("description")}
                  error={errors.description?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={170} fw={500}>
                  Value
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter value"
                  {...register("value")}
                  error={errors.value?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={170} fw={500}>
                  Customers
                </Text>
                <Controller
                  name="customer_id"
                  control={control}
                  render={({ field }) => (
                    <Select
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
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={170} fw={500}>
                  Employees
                </Text>
                <Controller
                  name="user_id"
                  control={control}
                  render={({ field }) => (
                    <Select
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
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Contract Date
                </Text>
                <Controller
                  name="contract_date"
                  control={control}
                  render={({ field }) => (
                    <DatePickerInput
                      {...field}
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
                <Text w={130} fw={500}>
                  Start Date
                </Text>
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field }) => (
                    <DatePickerInput
                      {...field}
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
                <Text w={130} fw={500}>
                  End Date
                </Text>
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePickerInput
                      {...field}
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      leftSection={<IconCalendar />}
                      leftSectionPointerEvents="none"
                      placeholder="Pick date"
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
                Create
              </Button>
            </Flex>
          </form>
        </Box>
      </Modal>
      <Flex justify="end">
        <Button onClick={open} leftSection={<IconPlus size={16} />}>
          Create
        </Button>
      </Flex>
    </Box>
  );
};

export default ProjectCreateForm;
