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
import HeaderAdmin from "./components/layout/AppBarAdmin";
import ReservationsPage from "./pages/ReservationsPage";
import QuotesPage from "./pages/QuotesPage";
import DealsPage from "./pages/DealsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationQuote from "./pages/ConfirmationQuotePage";
import { CircularProgress } from "@mui/material";
import MyFlightPage from "./pages/MyFlightPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import ConfirmationFlightPage from "./pages/ConfirmationFlightPage";
import CheckoutDealPage from "./pages/CheckoutDealPage";
import FaqsPage from "./pages/FaqsPage";
import AirportsTemplate from "./components/templates/AirportsTemplate";
import PricesPage from "./pages/PricesPage";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <HeaderAdmin />
    {children}
  </>
);


function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/admin"
    || location.pathname === "/forgotPassword"
    || location.pathname === "/dashboard"
    || location.pathname === "/verify-code"
    || location.pathname === "/reset-password"
    || location.pathname === "/dashboard/reservations"
    || location.pathname === "/dashboard/quotes"
    || location.pathname === "/dashboard/deals"
    ;

  const RequireAuth = ({ children }: any) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return isAuthenticated ? children : <Navigate to="/admin" />;
  };
  const RequireForgotPassword = ({ children }: any) => {
    const { forgotPasswordCompleted, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return forgotPasswordCompleted ? children : <Navigate to="/forgotPassword" />;
  };

  const RequireVerifyCode = ({ children }: any) => {
    const { verifyCodeCompleted, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return verifyCodeCompleted ? children : <Navigate to="/verify-code" />;
  };

  const RequireConfirmQuote = ({ children }: any) => {
    const { confirmQuoteCompleted, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return confirmQuoteCompleted ? children : <Navigate to="/" />;
  };

  const RequireReservationForm = ({ children }: any) => {
    const { reservationFormCompleted, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return reservationFormCompleted ? children : <Navigate to="/*" />;
  }

  const RequireMyTrip = ({ children }: any) => {
    const { myTripCompleted, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return myTripCompleted ? children : <Navigate to="/*" />;
  }

  const RequirePay = ({ children }: any) => {
    const { payCompleted, loading } = useAuth();
    if (loading) {
      return <CircularProgress sx={{ color: "#E68A00" }} />;
    }
    return payCompleted ? children : <Navigate to="/*" />
  }

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
        <Route path="/faq" element={<FaqsPage />} />
        <Route path="/checkout" element={
          <RequireReservationForm>
            <CheckoutPage />
          </RequireReservationForm>
        } />

        <Route path="/checkoutDeal" element={
          <CheckoutDealPage />
        } />

        <Route path="/confirmationQuote" element={
          <RequireConfirmQuote>
            <ConfirmationQuote />
          </RequireConfirmQuote>
        } />

        <Route path="/myTrips/flightDetail" element={
          <RequireMyTrip>
            <MyFlightPage />
          </RequireMyTrip>
        } />

        <Route path="/confirmationFlight" element={
          <RequirePay>
            <ConfirmationFlightPage />
          </RequirePay>
        } />

        <Route path="/airports/:name" element={<AirportsTemplate />} />

        <Route path="/terms&conditions" element={<TermsOfUsePage />} />

        <Route path="/admin" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/verify-code" element={<RequireForgotPassword><VerifyCodePage /></RequireForgotPassword>} />
        <Route path="/reset-password" element={<RequireVerifyCode><ResetPasswordPage /></RequireVerifyCode>} />
        <Route path="/dashboard" element={<RequireAuth><DashboardLayout><DashboardPage /></DashboardLayout></RequireAuth>} />
        <Route path="/dashboard/reservations" element={<RequireAuth><DashboardLayout><ReservationsPage /></DashboardLayout></RequireAuth>} />
        <Route path="/dashboard/quotes" element={<RequireAuth><DashboardLayout><QuotesPage /></DashboardLayout></RequireAuth>} />
        <Route path="/dashboard/deals" element={<RequireAuth><DashboardLayout><DealsPage /></DashboardLayout></RequireAuth>} />
        <Route path="/dashboard/prices" element={<RequireAuth><DashboardLayout><PricesPage /></DashboardLayout></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavbarFooter && <Slogan />}
      {!hideNavbarFooter && <Footer />}
    </NextUIProvider>
  );
}

export default App;
