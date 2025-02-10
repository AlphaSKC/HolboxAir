import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [forgotPasswordCompleted, setForgotPasswordCompleted] = useState(false);
    const [verifyCodeCompleted, setVerifyCodeCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = useCallback(() => {
        const profile = localStorage.getItem("profile");
        setIsAuthenticated(!!profile);

        const forgotPasswordStatus = localStorage.getItem("forgotPasswordCompleted");
        setForgotPasswordCompleted(forgotPasswordStatus === "true");

        const verifyCodeStatus = localStorage.getItem("verifyCodeCompleted");
        setVerifyCodeCompleted(verifyCodeStatus === "true");

        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return {
        isAuthenticated,
        forgotPasswordCompleted,
        verifyCodeCompleted,
        loading,
    };
};
