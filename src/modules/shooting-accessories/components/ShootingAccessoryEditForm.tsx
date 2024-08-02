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
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import {
  shootingAccessoryFormSchema,
  ShootingCategory,
  TShootingAccessoryFormSchema,
} from "../types";
import { useGetShootingAccessory } from "../hooks/useGetShootingAccessory";
import { useUpdateShootingAccessory } from "../hooks/useUpdateShootingAccessory";
import { useGetAllShootingCategories } from "../../shooting-category/hooks/useGetAllShootingCategories";

interface ShootingAccessoryEditFormProps {
  id: number;
}

const ShootingAccessoryEditForm: FC<ShootingAccessoryEditFormProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: shootingAccessory } = useGetShootingAccessory(id);
  const { data: shootingCategories } = useGetAllShootingCategories("visible");

  const { mutate: updateShootingAccessory, isPending } =
    useUpdateShootingAccessory(id);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TShootingAccessoryFormSchema>({
    resolver: zodResolver(shootingAccessoryFormSchema),
  });

  const onSubmit = (values: TShootingAccessoryFormSchema) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shooting_category_id", values.shooting_category_id);
    updateShootingAccessory(formData, {
      onSuccess: () => {
        close();
        toast.success("Shooting category updated Successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    });
  };

  useEffect(() => {
    if (shootingAccessory) {
      setValue("name", shootingAccessory.name);
      setValue(
        "shooting_category_id",
        shootingAccessory.shooting_category_id.toString()
      );
    }
  }, [shootingAccessory, setValue]);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Shooting category Form"
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
                  placeholder="Enter category name"
                  {...register("name")}
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

export default ShootingAccessoryEditForm;
