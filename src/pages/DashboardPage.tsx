import { Box } from "@mui/material";
import GeneralStats from "../components/admin/dashboard/GeneralStats";
import MonthlyReservationsChart from "../components/admin/dashboard/GraphReservations";

export default function DashboardPage() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
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
            }}
        >
            <GeneralStats />
            <MonthlyReservationsChart />
        </Box>
    );
}