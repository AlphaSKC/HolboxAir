import { Box } from "@mui/material";
import TripContainer from "../components/myTrips/TripContainer";

export default function MyTripsPage() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TripContainer />
        </Box>
    );
}