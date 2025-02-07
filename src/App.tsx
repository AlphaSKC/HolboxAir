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
import { Button } from "@mui/material";

const PrivateRoute = ({ element: Element, ...rest }: { element: any }) => {
  return localStorage.getItem('profile') ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/404" />
  );
};

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/admin" || location.pathname === "/forgotPassword" || location.pathname === "/dashboard";

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
        <Route path="/dashboard" element={<PrivateRoute element={<Button>Hola</Button>} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavbarFooter && <Slogan />}
      {!hideNavbarFooter && <Footer />}
    </NextUIProvider>
  );
}

export default App;
