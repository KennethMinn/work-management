import {
  Box,
  Button,
  Flex,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, TCustomerFormSchema } from "../types";
import { useForm } from "react-hook-form";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import { FC, useEffect } from "react";
import { useGetCustomer } from "../hooks/useGetCustomer";

interface CustomerEditFormProps {
  id: number;
}

const CustomerEditForm: FC<CustomerEditFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateCustomer, isPending } = useUpdateCustomer(id);
  const { data: customer } = useGetCustomer(id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TCustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  const onSubmit = (values: TCustomerFormSchema) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key as keyof TCustomerFormSchema] as string);
    }
    updateCustomer(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Customer updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    if (customer) {
      setValue("name", customer.name);
      setValue("business_type", customer.business_type);
      setValue("contact_person", customer.contact_person);
      setValue("phone", customer.phone);
      setValue("email", customer.email);
      setValue("address", customer.address);
      setValue("social_link", customer.social_link);
    }
  }, [customer, setValue]);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        size={550}
        padding={30}
        title="Create Customer Form"
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
                <Text w={180} fw={500}>
                  Name
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={180} fw={500}>
                  Business Type
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter business type"
                  {...register("business_type")}
                  error={errors.business_type?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={180} fw={500}>
                  Contact
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter contact"
                  {...register("contact_person")}
                  error={errors.contact_person?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={180} fw={500}>
                  Phone
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={180} fw={500}>
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
                <Text w={180} fw={500}>
                  Address
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter address"
                  {...register("address")}
                  error={errors.address?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={180} fw={500}>
                  Social Link
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter social link"
                  {...register("social_link")}
                  error={errors.social_link?.message}
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
      <IconEdit
        onClick={open}
        style={{ color: "#4361ee", cursor: "pointer" }}
      />
    </Box>
  );
};

export default CustomerEditForm;
