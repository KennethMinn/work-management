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
      {
        path: "all-tasks",
        element: <div>all-tasks</div>,
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
        path: "employee-list",
        element: <EmployeeListing />,
      },
      {
        path: "department-list",
        element: <DepartmentListing />,
      },
      {
        path: "position-list",
        element: <PositionListing />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found.</div>,
  },
]);
