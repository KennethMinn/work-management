import { AppShell } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const AuthLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: isOpen ? 250 : 80,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <AppShell.Main pt={80}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AuthLayout;
