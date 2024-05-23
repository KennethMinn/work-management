import { Box, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCreateCompany } from "../hooks/useCreateCompany";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema, TCompanyFormSchema } from "../types";
import { useForm } from "react-hook-form";

const CompanyCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createCompany, isPending } = useCreateCompany();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
  });

  const onSubmit = (values: TCompanyFormSchema) => {
    const formData = new FormData();
    formData.append("name", values.name);
    createCompany(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Company created Successfully.");
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
        title="Create Company Form"
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
            <Flex align="center" gap="lg">
              <Text fw={500}>Name</Text>
              <TextInput
                style={{ width: "100%" }}
                placeholder="Enter company name"
                {...register("name")}
                error={errors.name?.message}
              />
            </Flex>
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

export default CompanyCreateForm;
