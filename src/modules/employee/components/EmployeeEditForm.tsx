import { Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

const EmployeeEditForm = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Employee Form"
        centered
        styles={{
          title: {
            fontSize: "20px",
            fontWeight: 600,
          },
        }}
      >
        dsfadsf
      </Modal>
      <IconEdit
        onClick={open}
        style={{ color: "#4361ee", cursor: "pointer" }}
      />
    </Box>
  );
};

export default EmployeeEditForm;
