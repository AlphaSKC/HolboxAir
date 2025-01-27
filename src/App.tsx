import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/admin";

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
        <Route path="/admin" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavbarFooter && <Slogan />}
      {!hideNavbarFooter && <Footer />}
    </NextUIProvider>
  );
}

export default App;
