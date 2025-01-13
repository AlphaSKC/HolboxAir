import { Box } from "@mui/material";
import HeroContainer from "../components/home/HeroContainer";
import ExtraServices from "../components/home/ExtraServices";
import ImageDivider from "../components/home/ImageDivider";

export default function HomePage() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor:'#e6e6e6'
        }}>
            <HeroContainer />
            <ExtraServices />
            <ImageDivider />
        </Box>
    );
}