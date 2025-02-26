import { Box } from "@mui/material";
import ForgotPassword from "../components/authentication/ForgotPassword";

export default function ForgotPasswordPage() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <ForgotPassword />
        </Box>
    );
}
