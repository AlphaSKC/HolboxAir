import { Box } from "@mui/material";
import ReservationList from "../components/admin/reservations/ReservationList";

export default function ReservationsPage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            bgcolor: "#F3F4F9",
            padding: {
                xs: "100px 40px 100px 100px",
                sm: "100px 40px 100px 100px",
                md: "100px 40px 100px 100px",
                lg: "100px",
            },
            width: "100%",
            boxSizing: "border-box",
        }}>
            <ReservationList />
        </Box>
    )
}