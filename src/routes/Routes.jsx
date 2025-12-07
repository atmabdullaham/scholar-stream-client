import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import AllScholarships from "../pages/allScholarships/AllScholarships";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";

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
    ],
  },
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
]);

export default router;
