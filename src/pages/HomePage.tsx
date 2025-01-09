import { Box } from "@mui/material";
import HeroContainer from "../components/home/HeroContainer";

export default function HomePage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor:'red'
        }}>
            <HeroContainer />
        </Box>
    );
}