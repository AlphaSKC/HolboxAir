import { Grid2 } from "@mui/material";
import HomeSlider from "./HomeSlider";
import ReservationsForm from "./ReservationsForm";

export default function HeroContainer() {
    return (
        <Grid2 container spacing={0} width={"100%"}>
            <Grid2 size={{ xs: 12, md: 6.5 }}>
                <ReservationsForm/>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5.5 }} sx={{ height:'fit-content' }}>
                <HomeSlider/>
            </Grid2>
        </Grid2>
    );
}