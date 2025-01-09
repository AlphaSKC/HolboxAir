import { Grid2 } from "@mui/material";
import HomeSlider from "./HomeSlider";

export default function HeroContainer() {
    return (
        <Grid2 container spacing={0} width={"100%"}>
            <Grid2 size={{ xs: 12, md: 6.5 }}>
                Hola
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5.5 }} sx={{ height:'fit-content' }}>
                <HomeSlider/>
            </Grid2>
        </Grid2>
    );
}