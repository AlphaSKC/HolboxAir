import { Box } from "@mui/material";
import TripContainer from "../components/myTrips/TripContainer";
import { useEffect } from "react";

export default function MyTripsPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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