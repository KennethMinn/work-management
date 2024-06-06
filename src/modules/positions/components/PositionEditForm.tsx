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
import { IconEdit } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePosition } from "../hooks/useUpdatePosition";
import toast from "react-hot-toast";
import { useGetPosition } from "../hooks/useGetPosition";
import { Controller, useForm } from "react-hook-form";
import { Department, positionFormSchema, TPositionFormSchema } from "../types";
import { useGetAllDepartments } from "../../department/hooks/useGetAllDepartments";

interface PositionCompanyEditFormProps {
  id: number;
}

const PositionEditForm: FC<PositionCompanyEditFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: position } = useGetPosition(id);
  const { data: departments } = useGetAllDepartments();
  const { mutate: updateDepartment, isPending } = useUpdatePosition(id);

  const {
    register,
    handleSubmit,
    setValue,
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
    updateDepartment(formData, {
      onSuccess: () => {
        close();
        toast.success("Position updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    if (position) {
      setValue("name", position.name);
      setValue("department_id", position.department_id?.toString());
    }
  }, [position, setValue]);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Position Form"
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

export default PositionEditForm;
