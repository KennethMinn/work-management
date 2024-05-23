import {
  Box,
  Button,
  Flex,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCreatePosition } from "../hooks/useCreatePosition";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Department, positionFormSchema, TPositionFormSchema } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useGetAllDepartments } from "../../department/hooks/useGetAllDepartments";

const PositionCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createDepartment, isPending } = useCreatePosition();
  const { data: departments } = useGetAllDepartments();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TPositionFormSchema>({
    resolver: zodResolver(positionFormSchema),
  });

  const onSubmit = (values: TPositionFormSchema) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key as keyof TPositionFormSchema] as string);
    }
    createDepartment(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Department created Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Position Form"
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
              <Flex align="center" gap="lg">
                <Text w={130} fw={500}>
                  Name
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter position name"
                  {...register("name")}
                  error={errors.name?.message}
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

export default PositionCreateForm;
