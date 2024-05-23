import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { AlertModal } from "../../../components/AlertModal";

const EmployeeDeleteForm = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const onDelete = () => {
    alert("deleted");
    close();
  };

  return (
    <Box>
      <AlertModal
        isLoading={false}
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
