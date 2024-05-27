import { AppShell, Box, NavLink, Space, Tooltip } from "@mantine/core";
import { navMenus } from "../../../configs/navMenus";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

type NavbarMenuProps = {
  isOpen: boolean;
};

const NavbarMenu: React.FC<NavbarMenuProps> = ({ isOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <AppShell.Navbar p="md" style={{ overflowY: "scroll" }}>
      {navMenus.map((navMenu, i) => (
        <Box key={i}>
          {isOpen ? (
            <NavLink
              py={15}
              style={{ border: "1px solid #efeef0", borderRadius: "8px" }}
              onClick={() => navigate(navMenu.href)}
              label={navMenu.label}
              leftSection={navMenu.icon}
              active={pathname === navMenu.href}
            />
          ) : (
            <Tooltip
              label={navMenu.label}
              position="right"
              withArrow
              arrowSize={6}
              offset={{ mainAxis: 10, crossAxis: 0 }}
            >
              <NavLink
                py={0}
                style={{ border: "1px solid #efeef0", borderRadius: "8px" }}
                onClick={() => navigate(navMenu.href)}
                label={navMenu.label}
                leftSection={navMenu.icon}
                active={pathname === navMenu.href}
              />
            </Tooltip>
          )}

          <Space h="sm" />
        </Box>
      ))}
    </AppShell.Navbar>
  );
};

export default NavbarMenu;
