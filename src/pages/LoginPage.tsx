import { Box } from "@mui/material";
import LoginForm from "../components/authentication/LoginForm";

export default function LoginPage() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center", bgcolor: "#f5f5f5" }}>
        <LoginForm />
    </Box>
  );
}
