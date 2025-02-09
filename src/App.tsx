import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavbarLayout from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import Slogan from "./components/layout/Slogan";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import MyTripsPage from "./pages/MyTripsPage";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import FlightDealsPage from "./pages/FlightDealsPage";
import ExtraServicesTemplate from "./components/templates/ExtraServicesTemplate";
import LoginPage from "./pages/LoginPage";
import AddedValueTemplate from "./components/templates/AddedValueTemplate";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./hooks/useAuth";

function App() {
  const location = useLocation();
  const { isAuthenticated, forgotPasswordCompleted, verifyCodeCompleted } = useAuth();
  const hideNavbarFooter = location.pathname === "/admin"
    || location.pathname === "/forgotPassword"
    || location.pathname === "/dashboard"
    || location.pathname === "/verify-code"
    || location.pathname === "/reset-password"
    ;

  const RequireAuth = ({ children }: any) => {
    return isAuthenticated ? children : <Navigate to="/admin" />;
  };
  const RequireForgotPassword = ({ children }: any) => {
    return forgotPasswordCompleted ? children : <Navigate to="/forgotPassword" />;
  };

  const RequireVerifyCode = ({ children }: any) => {
    return verifyCodeCompleted ? children : <Navigate to="/verify-code" />;
  };

  return (
    <NextUIProvider>
      {!hideNavbarFooter && <NavbarLayout />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/myTrips" element={<MyTripsPage />} />
        <Route path="/flights" element={<FlightDealsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/extraServices/:name"
          element={<ExtraServicesTemplate />}
        />
        <Route path="/topics/:name" element={<AddedValueTemplate />} />
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/verify-code" element={<RequireForgotPassword><VerifyCodePage /></RequireForgotPassword>} />
        <Route path="/reset-password" element={<RequireVerifyCode><ResetPasswordPage /></RequireVerifyCode>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavbarFooter && <Slogan />}
      {!hideNavbarFooter && <Footer />}
    </NextUIProvider>
  );
}

export default App;
