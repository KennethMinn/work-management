import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <h1>haha </h1>,
      },
      {
        path: "report-list",
        element: <h1>haha </h1>,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found.</div>,
  },
]);
