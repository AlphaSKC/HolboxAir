import { Box, Button } from "@mui/material";
import { Form, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SendCode, VerifyCodePassword } from "../../services/AuthService";

export default function VerifyCode() {
    const [code, setCode] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(100);
    const [canResend, setCanResend] = useState(false);

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const isCodeComplete = code.every(digit => digit !== "");

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fullCode = code.join("");
        const data = {
            emailAdmin: email,
            code: fullCode,
        }
        const response = await VerifyCodePassword(data);
        if (response.success){
            localStorage.setItem("verifyCodeCompleted", 'true');
            navigate("/reset-password");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
        }
    };

    useEffect(() => {
        setEmail(localStorage.getItem("ForgotPasswordEmail") || "");
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleResend = async () => {
        if (canResend) {
            try {
                const data = {
                    emailAdmin: email,
                }
                const response = await SendCode(data);
                if (response.result) {
                    setTimeLeft(300);
                    setCanResend(false);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Box className="flex h-full w-full items-center justify-center">
            <Box className="flex w-full max-w-md flex-col gap-4 bg-content1 rounded-large px-8 pb-10 pt-6 mx-4">
                <NavLink to={"/"}>
                    <Box className="flex justify-center">
                        <img
                            src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fc9930c02910c48f79abbd96f757f76c2&methods=resize%2C500%2C5000"
                            alt="Logo Holbox Air"
                            loading="lazy"
                            style={{ width: "70%", height: "auto" }}
                        />
                    </Box>
                </NavLink>
                <Form
                    className="flex flex-col gap-4"
                    validationBehavior="native"
                    onSubmit={handleSubmit}
                >
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1vh" }}>
                        <p style={{ fontSize: "4vh", fontWeight: "bold" }}>
                            The code has been sent to your email
                        </p>
                        <p style={{ fontSize: "2.5vh", color: "#333333" }}>
                            Enter the code to reset your password
                        </p>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1vh" }}>
                        {code.map((digit, index) => (
                            <Input
                                key={index}
                                labelPlacement="outside"
                                name={`code-${index}`}
                                placeholder="-"
                                type="text"
                                variant="bordered"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                style={{ textAlign: "center" }}
                            />
                        ))}
                    </Box>
                    <Box className="flex w-full items-center justify-end px-1 py-2">
                        <Button
                            onClick={handleResend}
                            disabled={!canResend}
                            sx={{
                                color: canResend ? "#e68a00" : "#c4c4c4",
                                textTransform: "none",
                                ":hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            {canResend ? "Resend Code" : `You can resend the code in ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        disabled={!isCodeComplete}
                        sx={{
                            width: "100%",
                            backgroundColor: isCodeComplete ? "#e68a00" : "#c4c4c4",
                            borderRadius: "50px",
                            padding: "10px",
                            fontSize: "2.2vh",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            ":hover": {
                                backgroundColor: isCodeComplete ? "white" : "#c4c4c4",
                                color: isCodeComplete ? "#e68a00" : "white",
                            },
                        }}
                    >
                        Verify Code
                    </Button>
                </Form>
            </Box>
        </Box>
    );
}

