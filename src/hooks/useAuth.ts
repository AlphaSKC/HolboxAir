import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [forgotPasswordCompleted, setForgotPasswordCompleted] = useState(false);
    const [verifyCodeCompleted, setVerifyCodeCompleted] = useState(false);
    const [confirmQuoteCompleted, setConfirmQuoteCompleted] = useState(false);
    const [reservationFormCompleted, setReservationFormCompleted] = useState(false);
    const [myTripCompleted, setMyTripCompleted] = useState(false);
    const [payCompleted, setPayCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const checkAuthStatus = useCallback(() => {
        const profile = localStorage.getItem("profile");
        setIsAuthenticated(!!profile);

        const forgotPasswordStatus = localStorage.getItem("forgotPasswordCompleted");
        setForgotPasswordCompleted(forgotPasswordStatus === "true");

        const verifyCodeStatus = localStorage.getItem("verifyCodeCompleted");
        setVerifyCodeCompleted(verifyCodeStatus === "true");

        const confirmQuoteStatus = localStorage.getItem("quoteCompleted");
        setConfirmQuoteCompleted(confirmQuoteStatus === "true");

        const reservationFormStatus = localStorage.getItem("reservationFormCompleted");
        setReservationFormCompleted(reservationFormStatus === "true");

        const myTripStatus = localStorage.getItem("myTripCompleted");
        setMyTripCompleted(myTripStatus === "true");

        const payStatus = localStorage.getItem("payCompleted");
        setPayCompleted(payStatus === "true");

        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return {
        isAuthenticated,
        forgotPasswordCompleted,
        verifyCodeCompleted,
        confirmQuoteCompleted,
        reservationFormCompleted,
        myTripCompleted,
        payCompleted,
        loading,
    };
};
