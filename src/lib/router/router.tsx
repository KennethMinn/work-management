import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import RootLayout from "../../layouts/RootLayout";
import Login from "../../components/auth/Login";
import EmployeeListing from "../../modules/employee/pages/EmployeeListing";

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
    ],
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <EmployeeListing />,
      },
      {
        path: "report-list",
        element: <EmployeeListing />,
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
