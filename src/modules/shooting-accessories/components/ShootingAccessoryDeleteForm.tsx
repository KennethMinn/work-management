import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDeleteShootingAccessory } from "../hooks/useDeleteShootingAccessory";

interface ShootingAccessoryDeleteFormProps {
  id: number;
}
const ShootingAccessoryDeleteForm: FC<ShootingAccessoryDeleteFormProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteShootingAccessory, isPending } =
    useDeleteShootingAccessory();

  const onDelete = () => {
    deleteShootingAccessory(id, {
      onSuccess: () => {
        close();
        toast.success("Shooting accessory deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Shooting Accessory Delete"
        description="This action cannot be undone."
        opened={opened}
        close={close}
        onConfirm={onDelete}
      />
      <IconTrash
        onClick={open}
        style={{ color: "#ef233c", cursor: "pointer" }}
      />
    </Box>
  );
};

export default ShootingAccessoryDeleteForm;
