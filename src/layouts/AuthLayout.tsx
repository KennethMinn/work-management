import { Alert, AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import dayjs from "dayjs";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { IconInfoCircle } from "@tabler/icons-react";

const AuthLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [visibleAlerts, setVisibleAlerts] = useState<boolean[]>([]);

  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");
  const currentTime = dayjs(new Date()).format("HH:mm");
  const { data: timeNotifications } = useGetNotifications(
    todayDate,
    currentTime
  );

  const handleCloseAlert = (index: number) => {
    setVisibleAlerts((prevVisibleAlerts) =>
      prevVisibleAlerts.map((isVisible, i) => (i === index ? false : isVisible))
    );
  };

  useEffect(() => {
    setVisibleAlerts(
      timeNotifications ? timeNotifications.map(() => true) : []
    );
  }, [timeNotifications]);

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
        {timeNotifications?.map(
          (noti, i) =>
            visibleAlerts[i] && (
              <Alert
                key={noti.id}
                onClose={() => handleCloseAlert(i)}
                withCloseButton
                mb={10}
                variant="light"
                color="blue"
                title={noti.contentManagement.content_title}
                icon={<IconInfoCircle />}
              />
            )
        )}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AuthLayout;
