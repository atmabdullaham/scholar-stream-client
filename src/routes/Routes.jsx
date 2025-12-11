import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AllScholarships from "../pages/allScholarships/AllScholarships";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AddScholarship from "../pages/dashboard/addScholarship/AddScholarship";
import MyProfile from "../pages/dashboard/myProfile/MyProfile";
import ScholarshipManagement from "../pages/dashboard/scholarshipManagement/ScholarshipManagement";
import UpdateScholarship from "../pages/dashboard/updateScholarship/UpdateScholarship";
import UsersManagement from "../pages/dashboard/userManagement/UserManagement";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import ScholarshipDetails from "../pages/scholarshipDetails/ScholarshipDetails";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-scholarships",
        Component: AllScholarships,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoutes>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoutes>
        ),
      },
    ],
  },
  // auth layout
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  // dashboard layout
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "users-management",
        element: <UsersManagement></UsersManagement>,
      },
      {
        path: "add-scholarship",
        loader: () => fetch("/countries.json"),
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "scholarship-management",
        element: <ScholarshipManagement></ScholarshipManagement>,
      },
      {
        path: "update-scholarship/:id",
        loader: () => fetch("/countries.json"),
        element: <UpdateScholarship></UpdateScholarship>,
      },
    ],
  },
]);

export default router;
