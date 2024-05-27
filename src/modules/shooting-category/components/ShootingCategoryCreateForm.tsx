import { Box, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateShootingCategory } from "../hooks/useCreateShootingCategory";
import {
  shootingCategoryFormSchema,
  TShootingCategoryFormSchema,
} from "../types";

const ShootingCategoryCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createShootingCategory, isPending } =
    useCreateShootingCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TShootingCategoryFormSchema>({
    resolver: zodResolver(shootingCategoryFormSchema),
  });

  const onSubmit = (values: TShootingCategoryFormSchema) => {
    const formData = new FormData();
    formData.append("name", values.name);
    createShootingCategory(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Shooting category created Successfully.");
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
        title="Shooting Category Company Form"
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
                placeholder="Enter category name"
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

export default ShootingCategoryCreateForm;
