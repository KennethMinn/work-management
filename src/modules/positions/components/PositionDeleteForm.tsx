import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { useDeletePosition } from "../hooks/useDeletePosition";
import { FC } from "react";
import toast from "react-hot-toast";

interface PositionDeleteFormProps {
  id: number;
}
const PositionDeleteForm: FC<PositionDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteDepartment, isPending } = useDeletePosition();

  const onDelete = () => {
    deleteDepartment(id, {
      onSuccess: () => {
        close();
        toast.success("Position deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Position Delete"
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

export default PositionDeleteForm;
