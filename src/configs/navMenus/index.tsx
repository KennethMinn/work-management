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
    href: "/dashboard",
  },
  {
    label: "Report List",
    icon: <IconReport />,
    href: "/dashboard/report-list",
  },
  {
    label: "Company List",
    icon: <IconBuilding />,
    href: "/dashboard/company-list",
  },
  {
    label: "Customer List",
    icon: <IconUsersGroup />,
    href: "/dashboard/customer-list",
  },
  {
    label: "Department List",
    icon: <IconBrandTeams />,
    href: "/dashboard/department-list",
  },
  {
    label: "Position List",
    icon: <IconUserMinus />,
    href: "/dashboard/position-list",
  },
  {
    label: "Employee List",
    icon: <IconUsers />,
    href: "/dashboard/employee-list",
  },
  {
    label: "Project List",
    icon: <IconPresentation />,
    href: "/dashboard/project-list",
  },
];
