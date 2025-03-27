import { Box, Grid2, Skeleton } from "@mui/material";
import { Coins01Icon, GridIcon, PercentIcon } from "hugeicons-react";
import Stat from "./Stat";
import { useEffect, useState } from "react";
import { GetGeneralStats } from "../../../services/AdminService";
import { GeneralStats } from "../../../types/types";

export default function GeneralStatsContainer() {
    const [data, setData] = useState<GeneralStats>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await GetGeneralStats();
            setData(response);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ mb: 5 }}>
            <Grid2 container spacing={3} justifyContent="center">
                {loading ? (
                    <>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '0 20px 20px 0px' }} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '0 20px 20px 0px' }} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '0 20px 20px 0px' }} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '0 20px 20px 0px' }} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '0 20px 20px 0px' }} />
                        </Grid2>
                    </>
                ) : (
                    <>
                        <Stat
                            title="Total de cotizaciones"
                            value={`${data?.totalCotizaciones}`}
                            icon={<GridIcon color={"#dadde9"} size={40} />}
                        />
                        <Stat
                            title="Total de ingresos"
                            value={`$ ${data?.ingresosTotales} USD`}
                            icon={<Coins01Icon color={"#dadde9"} size={40} />}
                        />
                        <Stat
                            title="Total de reservaciones"
                            value={`${data?.totalReservaciones}`}
                            icon={<GridIcon color={"#dadde9"} size={40} />}
                        />
                        <Stat
                            title="Promedio de ingresosXreservación"
                            value={`$ ${data?.promedioIngreso} USD`}
                            icon={<Coins01Icon color={"#dadde9"} size={40} />}
                        />
                        <Stat
                            title="Tasa de conversión"
                            value={`${data?.tasaConversion}%`}
                            icon={<PercentIcon color={"#dadde9"} size={40} />}
                        />
                    </>
                )}
            </Grid2>
        </Box>
    )
}