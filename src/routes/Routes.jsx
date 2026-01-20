import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AllScholarships from "../pages/allScholarships/AllScholarships";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";
import Help from "../pages/help/Help";
import Privacy from "../pages/privacy/Privacy";
import Terms from "../pages/terms/Terms";
import AddScholarship from "../pages/dashboard/addScholarship/AddScholarship";
import AllReviews from "../pages/dashboard/allReviews/AllReviews";
import Analytics from "../pages/dashboard/analytics/Analytics";
import ApplicationManagement from "../pages/dashboard/applicationManagement/ApplicationManagement";
import MyApplications from "../pages/dashboard/myApplications/MyApplications";
import MyProfile from "../pages/dashboard/myProfile/MyProfile";
import MyReviews from "../pages/dashboard/myReviews/MyReviews";
import PaymentCancelled from "../pages/dashboard/payment/PaymentCancelled";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import ScholarshipManagement from "../pages/dashboard/scholarshipManagement/ScholarshipManagement";
import UpdateScholarship from "../pages/dashboard/updateScholarship/UpdateScholarship";
import UsersManagement from "../pages/dashboard/userManagement/UserManagement";
import Home from "../pages/home/Home";
import ScholarshipDetails from "../pages/scholarshipDetails/ScholarshipDetails";
import AdminRoute from "./AdminRoutes";
import ModaretorRoutes from "./ModaretorRoutes";
import PrivateRoutes from "./PrivateRoutes";
import StudentRoutes from "./StudentRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/help",
        Component: Help,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
      {
        path: "/terms",
        Component: Terms,
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
        index: true,
        element: <MyProfile></MyProfile>,
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "add-scholarship",
        loader: () => fetch("/countries.json"),
        element: (
          <AdminRoute>
            <AddScholarship></AddScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "scholarship-management",
        element: (
          <AdminRoute>
            <ScholarshipManagement></ScholarshipManagement>
          </AdminRoute>
        ),
      },
      {
        path: "update-scholarship/:id",
        loader: () => fetch("/countries.json"),
        element: (
          <AdminRoute>
            <UpdateScholarship></UpdateScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics></Analytics>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      // modarator routes
      {
        path: "application-management",
        element: (
          <ModaretorRoutes>
            <ApplicationManagement></ApplicationManagement>
          </ModaretorRoutes>
        ),
      },
      {
        path: "all-reviews",
        element: <AllReviews></AllReviews>,
      },
      // Student routes
      {
        path: "my-application",
        element: (
          <StudentRoutes>
            <MyApplications></MyApplications>
          </StudentRoutes>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <StudentRoutes>
            <MyReviews></MyReviews>
          </StudentRoutes>
        ),
      },
    ],
  },
]);

export default router;
