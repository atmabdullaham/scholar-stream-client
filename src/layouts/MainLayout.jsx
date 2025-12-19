import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-280px)] mt-20">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
