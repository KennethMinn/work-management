import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { useDeleteDepartment } from "../hooks/useDeleteDepartment";
import { FC } from "react";
import toast from "react-hot-toast";

interface DepartmentDeleteFormProps {
  id: number;
}
const DepartmentDeleteForm: FC<DepartmentDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteDepartment, isPending } = useDeleteDepartment();

  const onDelete = () => {
    deleteDepartment(id, {
      onSuccess: () => {
        close();
        toast.success("Department deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Department Delete"
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

export default DepartmentDeleteForm;
