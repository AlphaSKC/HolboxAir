import { Box } from "@mui/material";
import ResetPassword from "../components/authentication/ResetPassword";

export default function ResetPasswordPage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f5f5f5",
        }}>
            <ResetPassword />
        </Box>
    );
}