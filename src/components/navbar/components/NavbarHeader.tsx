import { AppShell, Burger, Group } from "@mantine/core";
import React from "react";
import { NavbarProps } from "../../../types/navbar";

const NavbarHeader: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger
          opened={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          size="sm"
        />
        Beyond
      </Group>
    </AppShell.Header>
  );
};

export default NavbarHeader;
