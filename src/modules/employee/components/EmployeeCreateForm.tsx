import {
  Avatar,
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Modal,
  PasswordInput,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCloudUpload, IconPlus } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Company,
  Department,
  employeeCreateFormSchema,
  Position,
  TEmployeeCreateFormSchema,
} from "../types";
import { Controller, useForm } from "react-hook-form";
import { useGetAllDepartments } from "../../department/hooks/useGetAllDepartments";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useGetAllCompanies } from "../../company/hooks/useGetAllCompanies";
import { useGetAllPositions } from "../../positions/hooks/useGetAllPositions";
import { useEffect, useRef, useState } from "react";

const EmployeeCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createEmployee, isPending } = useCreateEmployee();
  const { data: departments } = useGetAllDepartments();
  const { data: companies } = useGetAllCompanies();
  const { data: positions } = useGetAllPositions();

  //for avatar
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  } = useForm<TEmployeeCreateFormSchema>({
    resolver: zodResolver(employeeCreateFormSchema),
    defaultValues: {
      gender: "Male",
    },
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

  const onSubmit = (values: TEmployeeCreateFormSchema) => {
    if (!file) {
      toast.error("Please Add profile");
      return;
    }
    const data = { ...values, photo_path: file };
    const formData = new FormData();
    for (const key in data) {
      formData.append(
        key,
        data[key as keyof TEmployeeCreateFormSchema] as string
      );
    }
    createEmployee(formData, {
      onSuccess: () => {
        reset();
        close();
        setFile(null);
        toast.success("Employee Created Successfully.");
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
        title="Create Employee Form"
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
              {previewUrl && (
                <Avatar
                  mb={30}
                  src={previewUrl}
                  w={150}
                  h={150}
                  radius="100%"
                  alt="avatar"
                />
              )}
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Profile
                </Text>
                <Group style={{ width: "100%" }}>
                  <FileButton
                    resetRef={resetRef}
                    onChange={setFile}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <Button leftSection={<IconCloudUpload />} {...props}>
                        Upload image
                      </Button>
                    )}
                  </FileButton>
                  <Button disabled={!file} color="red" onClick={clearFile}>
                    Reset
                  </Button>
                </Group>
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Name
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter employee name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Email
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter email"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Password
                </Text>
                <PasswordInput
                  style={{ width: "100%" }}
                  placeholder="Enter password"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  phone
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  nrc number
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter nrc number"
                  {...register("nrc_number")}
                  error={errors.nrc_number?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Gender
                </Text>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Radio.Group {...field} style={{ width: "100%" }}>
                      <Group>
                        <Radio value="Male" label="Male" />
                        <Radio value="Female" label="Female" />
                      </Group>
                    </Radio.Group>
                  )}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Role
                </Text>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pick role"
                      data={["admin", "employee"]}
                      {...field}
                      error={errors.role?.message}
                    />
                  )}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Company
                </Text>
                <Controller
                  name="company_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pick company"
                      data={companies?.map((company: Company) => ({
                        label: company.name,
                        value: company.id.toString(),
                      }))}
                      {...field}
                      error={errors.company_id?.message}
                    />
                  )}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Department
                </Text>
                <Controller
                  name="department_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pick department"
                      data={departments?.map((department: Department) => ({
                        label: department.name,
                        value: department.id.toString(),
                      }))}
                      {...field}
                      error={errors.department_id?.message}
                    />
                  )}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Position
                </Text>
                <Controller
                  name="position_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pick position"
                      data={positions?.map((position: Position) => ({
                        label: position.name,
                        value: position.id.toString(),
                      }))}
                      {...field}
                      error={errors.position_id?.message}
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

export default EmployeeCreateForm;
