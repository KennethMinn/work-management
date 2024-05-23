import { Box, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCompany } from "../hooks/useUpdateCompany";
import toast from "react-hot-toast";
import { useGetCompany } from "../hooks/useGetCompany";
import { useForm } from "react-hook-form";
import { companyFormSchema, TCompanyFormSchema } from "../types";

interface CompanyEditFormProps {
  id: number;
}

const CompanyEditForm: FC<CompanyEditFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: company } = useGetCompany(id);
  const { mutate: updateCompany, isPending } = useUpdateCompany(id);

  const { register, handleSubmit, setValue } = useForm<TCompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
  });

  const onSubmit = (values: TCompanyFormSchema) => {
    const formData = new FormData();
    formData.append("name", values.name);
    updateCompany(formData, {
      onSuccess: () => {
        close();
        toast.success("Company updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    setValue("name", company?.name);
  }, [company, setValue]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex align="center" gap="lg">
              <Text fw={500}>Name</Text>
              <TextInput
                style={{ width: "100%" }}
                placeholder="Enter company name"
                {...register("name")}
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

export default CompanyEditForm;
