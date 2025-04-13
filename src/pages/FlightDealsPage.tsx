import { Box } from "@mui/material";
import Deals from "../components/flightDeals/Deals";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function FlightDealsPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Holbox Air: Flight Deals</title>
                <meta name="description" content="Cheap flights to Holbox. Special prices for flexible travelers." />
                <meta name="keywords" content="deals, discounts, offers" />
                <meta name="author" content="Holbox Air" />
                <link rel="canonical" href="https://holboxair.com/flight-deals" />
                <meta name="og:title" content="Flight Deals | Holbox Air" />
                <meta name="og:description" content="Cheap flights to Holbox. Special prices for flexible travelers." />
                <meta name="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
                <meta name="og:url" content="https://holboxair.com/flight-deals" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content="Holbox Air" />
            </Helmet>
            <Box>
                <Deals />
            </Box>
        </>
    );
}