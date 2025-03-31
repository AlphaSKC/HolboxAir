import { Box } from "@mui/material";
import TripContainer from "../components/myTrips/TripContainer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function MyTripsPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Helmet>
                <title>Holbox Air: My Trips</title>
                <meta name="description" content="Manage your trips and reservations with Holbox Air." />
                <meta name="keywords" content="my trips, reservations, manage trips" />
                <meta name="author" content="Holbox Air" />
                <link rel="canonical" href="https://holboxair.com/my-trips" />
                <meta name="og:title" content="My Trips | Holbox Air" />
                <meta name="og:description" content="Manage your trips and reservations with Holbox Air." />
                <meta name="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
                <meta name="og:url" content="https://holboxair.com/my-trips" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content="Holbox Air" />
            </Helmet>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <TripContainer />
            </Box>
        </>
    );
}