import { Alert, AppShell } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import dayjs from "dayjs";
import { IconInfoCircle } from "@tabler/icons-react";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { useCloseNoti } from "../hooks/useCloseNoti";

const AuthLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");
  const currentTime = dayjs(new Date()).format("HH:mm");
  const { data: timeNotifications } = useGetNotifications(
    todayDate,
    currentTime
  );
  const { mutate: closeNoti } = useCloseNoti();

  const handleCloseAlert = (id: number) => {
    closeNoti(id);
  };

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
        {timeNotifications
          ?.filter((item) => item.contentManagement.is_close === 0)
          .map((noti) => (
            <Alert
              key={noti.id}
              onClose={() => handleCloseAlert(noti.contentManagement.id)}
              withCloseButton
              mb={10}
              variant="filled"
              color="red"
              title={noti.contentManagement.content_title}
              icon={<IconInfoCircle />}
            />
          ))}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AuthLayout;
