import { Box, Typography } from "@mui/material";

export default function ReservationsPage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "blue",
        }}>
            <Typography>
                Reservations
            </Typography>
        </Box>
    )
}