import {
  IconBrandTeams,
  IconBuilding,
  IconCalendar,
  IconPresentation,
  IconReport,
  IconUserMinus,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

export const navMenus = [
  {
    label: "Task Calendar",
    icon: <IconCalendar />,
    href: "/",
  },
  {
    label: "Report List",
    icon: <IconReport />,
    href: "/report-list",
  },
  {
    label: "Company List",
    icon: <IconBuilding />,
    href: "/company-list",
  },
  {
    label: "Customer List",
    icon: <IconUsersGroup />,
    href: "/customer-list",
  },
  {
    label: "Department List",
    icon: <IconBrandTeams />,
    href: "/department-list",
  },
  {
    label: "Position List",
    icon: <IconUserMinus />,
    href: "/position-list",
  },
  {
    label: "Employee List",
    icon: <IconUsers />,
    href: "/employee-list",
  },
  {
    label: "Project List",
    icon: <IconPresentation />,
    href: "/project-list",
  },
];
