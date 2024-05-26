import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

interface EmployeeDeleteFormProps {
  id: number;
}
const EmployeeDeleteForm: FC<EmployeeDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteEmployee, isPending } = useDeleteEmployee();

  const onDelete = () => {
    deleteEmployee(id, {
      onSuccess: () => {
        close();
        toast.success("Employee deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Employee Delete"
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

export default EmployeeDeleteForm;
