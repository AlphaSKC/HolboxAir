import { Box, Button } from "@mui/material";
import { Form, Input } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { ChangePassword } from "../../services/AuthService";

export default function ResetPassword() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    const navigate = useNavigate();

    useEffect(() => {
        setEmail(localStorage.getItem("ForgotPasswordEmail") || "");
    },[]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        try{
            const data = {
                emailAdmin: email,
                password: password,
            }

            const response = await ChangePassword(data);
            if(response.success){
                localStorage.clear();
                setTimeout(() => {
                    navigate('/admin');
                }, 100);
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    };

    const passwordsMatch = password !== "" && confirmPassword !== "" && password === confirmPassword && password.trim().length > 0 && confirmPassword.trim().length > 0;

    return (
        <Box className="flex h-full w-full items-center justify-center">
            <Box className="flex w-full max-w-sm flex-col gap-4 bg-content1 rounded-large px-8 pb-10 pt-6">
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
                        <p style={{ fontSize: "2.5vh", color: "#333333" }}>
                            Enter your new password below.
                        </p>
                    </Box>
                    <Input
                        isRequired
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </button>
                        }
                        label="Password"
                        labelPlacement="outside"
                        name="password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        isRequired
                        endContent={
                            <button type="button" onClick={toggleVisibility2}>
                                {isVisible2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </button>
                        }
                        label="Confirm Password"
                        labelPlacement="outside"
                        name="confirmPassword"
                        placeholder="Enter your password"
                        type={isVisible2 ? "text" : "password"}
                        variant="bordered"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        sx={{
                            width: "100%",
                            backgroundColor: "#e68a00",
                            borderRadius: "50px",
                            padding: "10px",
                            fontSize: "2.2vh",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            ":hover": {
                                backgroundColor: "white",
                                color: "#e68a00",
                            },
                            ':disabled': {
                                backgroundColor: '#A0A0A0',
                                color: '#fff',
                                cursor: 'not-allowed',
                            }
                        }}
                        disabled={isLoading || !passwordsMatch}
                    >
                        Reset Password
                    </Button>
                </Form>
            </Box>
        </Box>
    );
}