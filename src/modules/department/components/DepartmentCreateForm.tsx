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
import { useCreateDepartment } from "../hooks/useCreateDepartment";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company, departmentFormSchema, TDepartmentFormSchema } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useGetAllCompanies } from "../../company/hooks/useGetAllCompanies";

const DepartmentCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createDepartment, isPending } = useCreateDepartment();
  const { data: companies } = useGetAllCompanies();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TDepartmentFormSchema>({
    resolver: zodResolver(departmentFormSchema),
  });

  const onSubmit = (values: TDepartmentFormSchema) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(
        key,
        values[key as keyof TDepartmentFormSchema] as string
      );
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
        title="Create Department Form"
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
                <Text w={100} fw={500}>
                  Name
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter department name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={100} fw={500}>
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

export default DepartmentCreateForm;
