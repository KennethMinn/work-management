import { Box, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  shootingCategoryFormSchema,
  TShootingCategoryFormSchema,
} from "../types";
import { useUpdateShootingCategory } from "../hooks/useUpdateShootingCategory";
import { useGetShootingCategory } from "../hooks/useGetShootingCategory";

interface ShootingCategoryEditFormProps {
  id: number;
}

const ShootingCategoryEditForm: FC<ShootingCategoryEditFormProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: shootingCategory } = useGetShootingCategory(id);
  const { mutate: updateShootingCategory, isPending } =
    useUpdateShootingCategory(id);

  const { register, handleSubmit, setValue } =
    useForm<TShootingCategoryFormSchema>({
      resolver: zodResolver(shootingCategoryFormSchema),
    });

  const onSubmit = (values: TShootingCategoryFormSchema) => {
    const formData = new FormData();
    formData.append("name", values.name);
    updateShootingCategory(formData, {
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
    if (shootingCategory) {
      setValue("name", shootingCategory.name);
    }
  }, [shootingCategory, setValue]);

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
            <Flex align="center" gap="lg">
              <Text fw={500}>Name</Text>
              <TextInput
                style={{ width: "100%" }}
                placeholder="Enter category name"
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

export default ShootingCategoryEditForm;
