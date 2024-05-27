import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDeleteShootingCategory } from "../hooks/useDeleteShootingCategory";

interface ShootingCategoryDeleteFormProps {
  id: number;
}
const ShootingCategoryDeleteForm: FC<ShootingCategoryDeleteFormProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteShootingCategory, isPending } =
    useDeleteShootingCategory();

  const onDelete = () => {
    deleteShootingCategory(id, {
      onSuccess: () => {
        close();
        toast.success("Shooting category deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Shooting category Delete"
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

export default ShootingCategoryDeleteForm;
