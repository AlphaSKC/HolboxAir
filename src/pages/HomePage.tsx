import { Box } from "@mui/material";
import HeroContainer from "../components/home/HeroContainer";
import ExtraServices from "../components/home/ExtraServices";
import ImageDivider from "../components/home/ImageDivider";
import AddedValue from "../components/home/AddedValue";
import Airports from "../components/home/Airports";
import PopularTopics from "../components/home/PopularTopics";
import PaymentMethods from "../components/home/PaymentMethods";
import { useEffect } from "react";

export default function HomePage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            overflowX: "hidden",
        }}>
            <HeroContainer />
            <ExtraServices />
            <ImageDivider />
            <AddedValue />
            <Airports />
            <PopularTopics />
            <PaymentMethods />
        </Box>
    );
}