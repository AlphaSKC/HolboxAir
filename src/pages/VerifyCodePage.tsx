import { Box } from "@mui/material";
import VerifyCode from "../components/authentication/VerifyCode";

export default function VerifyCodePage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f5f5f5",
        }}>
            <VerifyCode />
        </Box>
    );
}