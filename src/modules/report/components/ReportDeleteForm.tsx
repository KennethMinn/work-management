import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDeleteReport } from "../hooks/useDeleteReport";

interface ReportDeleteFormProps {
  id: number;
}

const ReportDeleteForm: FC<ReportDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteReport, isPending } = useDeleteReport();

  const onDelete = () => {
    deleteReport(id, {
      onSuccess: () => {
        close();
        toast.success("Report deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Report Delete"
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

export default ReportDeleteForm;
