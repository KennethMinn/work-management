import {
  Alert,
  AppShell,
  Avatar,
  Burger,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Menu,
  Popover,
} from "@mantine/core";
import React from "react";
import { NavbarProps } from "../../../types/navbar";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { IconBell, IconInfoCircle } from "@tabler/icons-react";
import { useGetNotifications } from "../../../hooks/useGetNotifications";
import dayjs from "dayjs";
import { useNotiDetail } from "../../../hooks/useNotiDetail";

const NavbarHeader: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { user, setAuth } = useAuth();
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");
  const { data: notifications, isLoading: isNotiLoading } =
    useGetNotifications(todayDate);
  const { mutate: enterDetail } = useNotiDetail();

  const logout = () => {
    setAuth(null);
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const onDetail = (id: number) => {
    enterDetail(id);
  };

  const isOwnerOrAdmin = user?.role === "admin" || user?.role === "owner";
  const hasNoti = notifications?.some(
    (noti) => noti.contentManagement.is_seen !== 1
  );

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
          {isOwnerOrAdmin && (
            <Popover
              width={400}
              position="bottom-end"
              offset={3}
              withArrow
              shadow="md"
            >
              <Popover.Target>
                <div style={{ position: "relative" }}>
                  <IconBell
                    stroke={1.5}
                    size={24}
                    color="blue"
                    style={{ cursor: "pointer" }}
                  />
                  {hasNoti && (
                    <div
                      style={{
                        borderRadius: "50%",
                        top: "0px",
                        right: "-7px",
                        position: "absolute",
                        backgroundColor: "blue",
                        width: "8px",
                        height: "8px",
                      }}
                    />
                  )}
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                {isNotiLoading ? (
                  <Center>
                    <Loader color="blue" />
                  </Center>
                ) : (
                  notifications?.map((noti) => (
                    <Alert
                      mb={8}
                      style={{ cursor: "pointer" }}
                      onClick={() => onDetail(noti.contentManagement.id)}
                      key={noti.id}
                      variant={
                        noti.contentManagement.is_seen === 1
                          ? "transparent"
                          : "light"
                      }
                      color="blue"
                      title={noti.contentManagement.content_title}
                      icon={<IconInfoCircle />}
                    />
                  ))
                )}
              </Popover.Dropdown>
            </Popover>
          )}

          <Menu position="bottom-end" offset={5}>
            <Menu.Target>
              <Avatar
                style={{ cursor: "pointer" }}
                src={user?.imgURL}
                alt="it's me"
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={logout}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Group>
    </AppShell.Header>
  );
};

export default NavbarHeader;
