import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useNavigate } from "react-router-dom";

interface TaskDeleteFormProps {
  id: number;
}
const CompanyDeleteForm: FC<TaskDeleteFormProps> = ({ id }) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteTask, isPending } = useDeleteTask();

  const onDelete = () => {
    deleteTask(id, {
      onSuccess: () => {
        close();
        navigate("/dashboard");
        toast.success("Task deleted successfully.");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Task Delete"
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

export default CompanyDeleteForm;
