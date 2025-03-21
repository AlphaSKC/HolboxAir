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

export default function HomePage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
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
    );
}