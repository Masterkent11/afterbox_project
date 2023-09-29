import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export const Layout = () => {
  const location = useLocation();
  const authRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/email-verification",
  ];

  return (
    <div className="app">
      {!authRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
      {!authRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};
