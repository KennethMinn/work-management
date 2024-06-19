import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import RootLayout from "../../layouts/RootLayout";
import LazyLoad from "../../components/LazyLoad";
import {
  AssignedTaskListing,
  CalendarListing,
  CompanyListing,
  CustomerListing,
  DepartmentListing,
  EmployeeListing,
  Home,
  Login,
  PositionListing,
  ProjectListing,
  ReportListing,
  ShootingAccessoryListing,
  ShootingCategoryListing,
  TaskListing,
} from "../../components/lazyLoadComps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyLoad>
            <Home />
          </LazyLoad>
        ),
      },
      {
        path: "login",
        element: (
          <LazyLoad>
            <Login />
          </LazyLoad>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyLoad>
            <CalendarListing />
          </LazyLoad>
        ),
      },
      {
        path: "assigned-tasks",
        element: (
          <LazyLoad>
            <AssignedTaskListing />
          </LazyLoad>
        ),
      },
      {
        path: "report-list",
        element: (
          <LazyLoad>
            <ReportListing />
          </LazyLoad>
        ),
      },
      {
        path: "company-list",
        element: (
          <LazyLoad>
            <CompanyListing />
          </LazyLoad>
        ),
      },
      {
        path: "customer-list",
        element: (
          <LazyLoad>
            <CustomerListing />
          </LazyLoad>
        ),
      },
      {
        path: "department-list",
        element: (
          <LazyLoad>
            <DepartmentListing />
          </LazyLoad>
        ),
      },
      {
        path: "position-list",
        element: (
          <LazyLoad>
            <PositionListing />
          </LazyLoad>
        ),
      },
      {
        path: "employee-list",
        element: (
          <LazyLoad>
            <EmployeeListing />
          </LazyLoad>
        ),
      },
      {
        path: "project-list",
        element: (
          <LazyLoad>
            <ProjectListing />
          </LazyLoad>
        ),
      },
      {
        path: "shooting-category-list",
        element: (
          <LazyLoad>
            <ShootingCategoryListing />
          </LazyLoad>
        ),
      },
      {
        path: "shooting-accessory-list",
        element: (
          <LazyLoad>
            <ShootingAccessoryListing />
          </LazyLoad>
        ),
      },
      {
        path: "all-tasks",
        element: (
          <LazyLoad>
            <TaskListing />
          </LazyLoad>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found.</div>,
  },
]);
