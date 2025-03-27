import { Box, Grid2 } from "@mui/material";
import { Coins01Icon, GridIcon } from "hugeicons-react";
import Stat from "./Stat";

export default function GeneralStats() {
    return (
        <Box sx={{ mb: 5 }}>
            <Grid2 container spacing={3}>
                <Stat
                    title="Total de cotizaciones"
                    value="23 cotizaciones"
                    icon={<GridIcon color={"#dadde9"} size={40} />}
                />
                <Stat
                    title="Total de ingresos"
                    value="$ 1,000.00"
                    icon={<Coins01Icon color={"#dadde9"} size={40} />}
                />
                <Stat
                    title="Total de reservaciones"
                    value="20 reservaciones"
                    icon={<GridIcon color={"#dadde9"} size={40} />}
                />
                <Stat
                    title="Promedio de ingresosXreservación"
                    value="$ 50.00"
                    icon={<Coins01Icon color={"#dadde9"} size={40} />}
                />

            </Grid2>
        </Box>
    )
}