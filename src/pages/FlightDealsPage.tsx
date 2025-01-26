import { Box } from "@mui/material";
import Deals from "../components/flightDeals/Deals";
import { useEffect } from "react";

export default function FlightDealsPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box>
            <Deals />
        </Box>
    );
}