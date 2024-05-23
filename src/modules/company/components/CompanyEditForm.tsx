import { Box, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { useUpdateCompany } from "../hooks/useUpdateCompany";
import toast from "react-hot-toast";
import { CompanyUpdateFormValues } from "../types";
import { useGetCompany } from "../hooks/useGetCompany";

interface CompanyEditFormProps {
  id: number;
}

const CompanyEditForm: FC<CompanyEditFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: company } = useGetCompany(id);

  const { mutate: updateCompany, isPending } = useUpdateCompany(id);
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (!value ? "Name is required" : null),
    },
  });

  const onSubmit = (values: CompanyUpdateFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    updateCompany(formData, {
      onSuccess: () => {
        form.reset();
        close();
        toast.success("Company updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    if (form) {
      form.setValues(company);
    }
  }, [company]);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Company Form"
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
      <IconEdit
        onClick={open}
        style={{ color: "#4361ee", cursor: "pointer" }}
      />
    </Box>
  );
};

export default CompanyEditForm;
