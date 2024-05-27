import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDeleteProject } from "../hooks/useDeleteProject";

interface ProjectDeleteFormProps {
  id: number;
}
const ProjectDeleteForm: FC<ProjectDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const onDelete = () => {
    deleteProject(id, {
      onSuccess: () => {
        close();
        toast.success("Project deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Project Delete"
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

export default ProjectDeleteForm;
