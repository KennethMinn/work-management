import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { FC } from "react";
import toast from "react-hot-toast";

interface CustomerDeleteFormProps {
  id: number;
}
const CustomerDeleteForm: FC<CustomerDeleteFormProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  const onDelete = () => {
    deleteCustomer(id, {
      onSuccess: () => {
        close();
        toast.success("Customer deleted successfully.");
      },
    });
  };

  return (
    <Box>
      <AlertModal
        isLoading={isPending}
        title="Customer Delete"
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

export default CustomerDeleteForm;
