import { lazy } from "react";

const Home = lazy(() => import("../Home"));
const Login = lazy(() => import("../modules/auth/components/Login"));
const CalendarListing = lazy(
  () => import("../modules/calendar/pages/CalendarListing")
);
const AssignedTaskListing = lazy(
  () => import("../modules/assigned-tasks/pages/AssignedTaskListing")
);
const ReportListing = lazy(
  () => import("../modules/report/pages/ReportListing")
);
const CompanyListing = lazy(
  () => import("../modules/company/pages/CompanyListing")
);
const CustomerListing = lazy(
  () => import("../modules/customer/pages/CustomerListing")
);
const DepartmentListing = lazy(
  () => import("../modules/department/pages/DepartmentListing")
);
const PositionListing = lazy(
  () => import("../modules/positions/pages/PositionListing")
);
const EmployeeListing = lazy(
  () => import("../modules/employee/pages/EmployeeListing")
);
const ProjectListing = lazy(
  () => import("../modules/project/pages/ProjectListing")
);
const ShootingCategoryListing = lazy(
  () => import("../modules/shooting-category/pages/ShootingCategoryListing")
);
const ShootingAccessoryListing = lazy(
  () => import("../modules/shooting-accessories/pages/ShootingAccessoryListing")
);
const TaskListing = lazy(() => import("../modules/calendar/pages/TaskListing"));

export {
  Home,
  Login,
  CalendarListing,
  AssignedTaskListing,
  ReportListing,
  CompanyListing,
  CustomerListing,
  DepartmentListing,
  PositionListing,
  EmployeeListing,
  ProjectListing,
  ShootingCategoryListing,
  ShootingAccessoryListing,
  TaskListing,
};
