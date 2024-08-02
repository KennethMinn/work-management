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
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCreateShootingAccessory } from "../hooks/useCreateShootingAccessory";
import {
  shootingAccessoryFormSchema,
  ShootingCategory,
  TShootingAccessoryFormSchema,
} from "../types";
import { useGetAllShootingCategories } from "../../shooting-category/hooks/useGetAllShootingCategories";

const ShootingAccessoryCreateForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createShootingAccessory, isPending } =
    useCreateShootingAccessory();
  const { data: shootingCategories } = useGetAllShootingCategories("visible");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TShootingAccessoryFormSchema>({
    resolver: zodResolver(shootingAccessoryFormSchema),
  });

  const onSubmit = (values: TShootingAccessoryFormSchema) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shooting_category_id", values.shooting_category_id);
    createShootingAccessory(formData, {
      onSuccess: () => {
        reset();
        close();
        toast.success("Shooting accessory created Successfully.");
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
        title="Shooting Accessory Company Form"
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
                <Text w={140} fw={500}>
                  Name
                </Text>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Enter accessory name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text w={140} fw={500}>
                  Category
                </Text>
                <Controller
                  name="shooting_category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pick shooting category"
                      data={shootingCategories?.map(
                        (shootingCategory: ShootingCategory) => ({
                          label: shootingCategory.name,
                          value: shootingCategory.id.toString(),
                        })
                      )}
                      {...field}
                      error={errors.shooting_category_id?.message}
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

export default ShootingAccessoryCreateForm;
