import { Grid2 } from "@mui/material";
import SideLeft from "./SideLeft";
import TripForm from "./TripForm";

export default function TripContainer() {
    return (
        <Grid2 container spacing={0} width={"100%"}>
            <Grid2 size={{ xs: 12, md: 6.5 }}>
                <SideLeft />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5.5 }} sx={{ height: 'fit-content' }}>
                <TripForm />
            </Grid2>
        </Grid2>
    );
}