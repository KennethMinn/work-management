import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import RootLayout from "../../layouts/RootLayout";
import Login from "../../modules/auth/components/Login";
import EmployeeListing from "../../modules/employee/pages/EmployeeListing";
import CalendarListing from "../../modules/calendar/pages/CalendarListing";
import CompanyListing from "../../modules/company/pages/CompanyListing";
import Home from "../../modules/home/pages/Home";
import DepartmentListing from "../../modules/department/pages/DepartmentListing";
import PositionListing from "../../modules/positions/pages/PositionListing";
import CustomerListing from "../../modules/customer/pages/CustomerListing";
import ProjectListing from "../../modules/project/pages/ProjectListing";
import ShootingCategoryListing from "../../modules/shooting-category/pages/ShootingCategoryListing";
import ShootingAccessoryListing from "../../modules/shooting-accessories/pages/ShootingAccessoryListing";
import TaskListing from "../../modules/calendar/pages/TaskListing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <h1>Login</h1>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <CalendarListing />,
      },
      {
        path: "report-list",
        element: <EmployeeListing />,
      },
      {
        path: "company-list",
        element: <CompanyListing />,
      },
      {
        path: "customer-list",
        element: <CustomerListing />,
      },
      {
        path: "department-list",
        element: <DepartmentListing />,
      },
      {
        path: "position-list",
        element: <PositionListing />,
      },
      {
        path: "employee-list",
        element: <EmployeeListing />,
      },
      {
        path: "project-list",
        element: <ProjectListing />,
      },
      {
        path: "shooting-category-list",
        element: <ShootingCategoryListing />,
      },
      {
        path: "shooting-accessory-list",
        element: <ShootingAccessoryListing />,
      },
      {
        path: "all-tasks",
        element: <TaskListing />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found.</div>,
  },
]);
