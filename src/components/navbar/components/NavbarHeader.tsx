import {
  AppShell,
  Avatar,
  Burger,
  Divider,
  Flex,
  Group,
  Image,
  Menu,
} from "@mantine/core";
import React from "react";
import { NavbarProps } from "../../../types/navbar";
import mama from "../../../assets/mama.jpg";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavbarHeader: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Flex align="center" gap="lg">
          <Burger
            opened={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            size="sm"
          />
          <Image style={{ cursor: "pointer" }} height={50} src={logo} />
        </Flex>
        <Flex align="center" gap="md">
          <Menu position="bottom-end" offset={5}>
            <Menu.Target>
              <Avatar style={{ cursor: "pointer" }} src={mama} alt="it's me" />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Settings</Menu.Item>
              <Divider />
              <Menu.Item onClick={logout}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Group>
    </AppShell.Header>
  );
};

export default NavbarHeader;
