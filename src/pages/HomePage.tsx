import { Box, useMediaQuery } from "@mui/material";
import HeroContainer from "../components/home/HeroContainer";
import ExtraServices from "../components/home/ExtraServices";
import ImageDivider from "../components/home/ImageDivider";
import AddedValue from "../components/home/AddedValue";
import Airports from "../components/home/Airports";
import PopularTopics from "../components/home/PopularTopics";
import PaymentMethods from "../components/home/PaymentMethods";
import { useEffect } from "react";
import AirportsMobile from "../components/home/AirportsMobile";
import { Helmet } from "react-helmet";

export default function HomePage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <>
            <Helmet>
                <title>Holbox Air: Flights to Isla Holbox</title>
                <meta name="description" content="Direct flights from Cancun to Holbox. Best air transportation company in 2025. Spend more time in Holbox and less time on the road. Find out the fastest and easiest way to get to Holbox." />
                <meta name="keywords" content="Holbox Air, charter flights Cancun, private flights Holbox, Cancun to Holbox flights, air taxi Holbox, private aviation Mexico" />
                <meta name="author" content="Holbox Air" />
                <link rel="canonical" href="https://holboxair.com/" />
                <meta name="og:title" content="Flights to Isla Holbox" />
                <meta name="og:description" content="Direct flights from Cancun to Holbox. Best air transportation company in 2025. Spend more time in Holbox and less time on the road. Find out the fastest and easiest way to get to Holbox." />
                <meta name="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
                <meta name="og:url" content="https://holboxair.com/" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content="Holbox Air" />
            </Helmet>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                overflowX: "hidden",
            }}>
                <HeroContainer />
                <PaymentMethods />
                <ExtraServices />
                <ImageDivider />
                <AddedValue />
                {isMobile ?
                    <AirportsMobile /> :
                    <Airports />
                }
                <PopularTopics />
            </Box>
        </>
    );
}