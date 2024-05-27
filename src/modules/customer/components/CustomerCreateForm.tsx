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
import { IconPlus } from "@tabler/icons-react";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, TCustomerFormSchema } from "../types";
import { useForm } from "react-hook-form";

const CustomerCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createCustomer, isPending } = useCreateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  const onSubmit = (values: TCustomerFormSchema) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key as keyof TCustomerFormSchema] as string);
    }
    createCustomer(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Customer created Successfully.");
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
      <Flex justify="end">
        <Button onClick={open} leftSection={<IconPlus size={16} />}>
          Create
        </Button>
      </Flex>
    </Box>
  );
};

export default CustomerCreateForm;
