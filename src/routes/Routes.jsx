import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AllScholarships from "../pages/allScholarships/AllScholarships";
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
]);

export default router;
