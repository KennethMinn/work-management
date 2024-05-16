import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import RootLayout from "../../layouts/RootLayout";
import Login from "../../modules/auth/components/Login";
import EmployeeListing from "../../modules/employee/pages/EmployeeListing";
import CalendarListing from "../../modules/calendar/pages/CalendarListing";
import CompanyListing from "../../modules/company/pages/CompanyListing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>haha </h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <h1>Login</h1>,
      },
      {
        path: "/all-tasks",
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
    ],
  },
  {
    path: "*",
    element: <div>Not found.</div>,
  },
]);
