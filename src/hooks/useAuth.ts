import { useState, useEffect } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [forgotPasswordCompleted, setForgotPasswordCompleted] = useState(false);
    const [verifyCodeCompleted, setVerifyCodeCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const profile = localStorage.getItem("profile");
        if (profile) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        const forgotPasswordStatus = localStorage.getItem("forgotPasswordCompleted");
        setForgotPasswordCompleted(forgotPasswordStatus === "true");

        const verifyCodeStatus = localStorage.getItem("verifyCodeCompleted");
        setVerifyCodeCompleted(verifyCodeStatus === "true");

        setLoading(false);
    }, []);

    return {
        isAuthenticated,
        forgotPasswordCompleted,
        verifyCodeCompleted,
        loading,
    };
};
