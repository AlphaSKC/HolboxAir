import { Box, Typography } from "@mui/material";

export default function DashboardPage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "red",
        }}>
            <Typography>
                Dashboard
            </Typography>
        </Box>
    );
}