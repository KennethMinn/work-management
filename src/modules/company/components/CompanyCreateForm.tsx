import { Box, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { CompanyCreateFormValues } from "../types";
import { useCreateCompany } from "../hooks/useCreateCompany";
import toast from "react-hot-toast";

const CompanyCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createCompany, isPending } = useCreateCompany();
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (!value ? "Name is required" : null),
    },
  });

  const onSubmit = (values: CompanyCreateFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    createCompany(formData, {
      onSuccess: () => {
        form.reset();
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
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex align="center" gap="lg">
              <Text fw={500}>Name</Text>
              <TextInput
                style={{ width: "100%" }}
                placeholder="Enter company name"
                {...form.getInputProps("name")}
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
