import { Box, Typography } from "@mui/material";

export default function DashboardPage() {
    console.log('DashboardPage: Render');
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