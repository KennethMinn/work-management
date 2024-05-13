import { Button, Flex, Modal, Text } from "@mantine/core";
import { FC } from "react";

type AlertModalProps = {
  opened: boolean;
  close: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading: boolean;
};

export const AlertModal: FC<AlertModalProps> = ({
  opened,
  close,
  title,
  description,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal
      size="sm"
      centered
      opened={opened}
      onClose={close}
      title={title}
      styles={{
        title: {
          fontSize: "20px",
          fontWeight: 600,
        },
      }}
    >
      <Flex direction="column">
        {description && (
          <Text opacity={0.7} fz={14}>
            {description}
          </Text>
        )}
      </Flex>
      <Flex justify="end" gap={15} mt={20}>
        <Button radius={4} size="sm" onClick={close} color="dark">
          Cancel
        </Button>
        <Button
          radius={4}
          size="sm"
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          color="red"
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};
