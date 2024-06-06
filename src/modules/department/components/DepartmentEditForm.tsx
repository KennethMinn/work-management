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
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";
import toast from "react-hot-toast";
import { useGetDepartment } from "../hooks/useGetDepartment";
import { Controller, useForm } from "react-hook-form";
import { Company, departmentFormSchema, TDepartmentFormSchema } from "../types";
import { useGetAllCompanies } from "../../company/hooks/useGetAllCompanies";

interface DepartmentCompanyEditFormProps {
  id: number;
}

const DepartmentEditForm: FC<DepartmentCompanyEditFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: department } = useGetDepartment(id);
  const { data: companies } = useGetAllCompanies();
  const { mutate: updateDepartment, isPending } = useUpdateDepartment(id);

  const {
    register,
    handleSubmit,
    setValue,
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
    updateDepartment(formData, {
      onSuccess: () => {
        close();
        toast.success("Department updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    if (department) {
      setValue("name", department.name);
      setValue("company_id", department.company_id?.toString());
    }
  }, [department, setValue]);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Department Form"
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

export default DepartmentEditForm;
