import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import FlightDetail from "../components/myTrips/FlightDetail";

export default function MyFlightPage() {
    const location = useLocation();
    const { tipo, identificador } = location.state || {};

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <FlightDetail
                tipo={tipo}
                identificador={identificador}
            />
        </Box>
    );
}