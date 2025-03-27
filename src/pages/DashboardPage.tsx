import { Box, Grid2 } from "@mui/material";
import MonthlyReservationsChart from "../components/admin/dashboard/MonthlyReservationsChart";
import GeneralStatsContainer from "../components/admin/dashboard/GeneralStats";
import MonthlyQuotesChart from "../components/admin/dashboard/MonthlyQuotesChart";
import MonthlyEarningsChart from "../components/admin/dashboard/MonthlyEarningsChart";
import PopularDestinationsChart from "../components/admin/dashboard/PopularDestinationsChart";
import MonthlyUnconvertedQuotesChart from "../components/admin/dashboard/MonthlyUnconvertedQuotesChart";

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
            <GeneralStatsContainer />
            <Grid2 container spacing={3} sx={{ justifyContent: "center" }}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <MonthlyReservationsChart />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <MonthlyQuotesChart />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <MonthlyEarningsChart />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <PopularDestinationsChart />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <MonthlyUnconvertedQuotesChart />
                </Grid2>
            </Grid2>
        </Box>
    );
}