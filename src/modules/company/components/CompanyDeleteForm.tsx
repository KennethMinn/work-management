import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { useDeleteCompany } from "../hooks/useDeleteCompany";
import { FC } from "react";
import toast from "react-hot-toast";

interface CompanyDeleteFormProps {
  id: number;
}
const CompanyDeleteForm: FC<CompanyDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteCompany, isPending } = useDeleteCompany();

  const onDelete = () => {
    deleteCompany(id, {
      onSuccess: () => {
        close();
        toast.success("Company deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Company Delete"
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
