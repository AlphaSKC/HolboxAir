import { useEffect, useState } from "react";
import { GetDashboardGraphs } from "../../../services/AdminService";
import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

export default function PopularDestinationsChart() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await GetDashboardGraphs();
            setApiData(response.destinosMasCotizados);
        } catch (error) {
            console.error(error);
        }
    }

    const processChartData = (data: any) => {
        if (!data || data.length === 0) {
            return [];
        }

        return data.map((item: { destino: string; totalCotizaciones: number }) => ({
            label: item.destino,
            value: item.totalCotizaciones,
        }));
    };

    const chartData = processChartData(apiData);

    const TOTAL = chartData.reduce((sum: number, item: any) => sum + item.value, 0);

    const getArcLabel = (params: { value: number }) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <Box sx={{ width: "100%", height: '100%', overflowX: "auto", bgcolor: "#ffff", borderRadius: 5, boxShadow: "0 0 10px #e8e8e8", padding: 2, mt: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Destinos más cotizados</Typography>

            <Box sx={{ width: "100%" }}>
                <PieChart
                    series={[
                        {
                            paddingAngle: 5,
                            innerRadius: 90,
                            outerRadius: 150,
                            data: chartData,
                            arcLabel: getArcLabel,
                        },
                    ]}
                    colors={["#FF4D4F", "#FF9800", "#FFEB3B", "#00cc66", "#2196F3", "#cc00cc"]}
                    height={450}
                    legend={{
                        padding: 10,
                        hidden: false,
                        direction: "row",
                        position: {
                            vertical: "bottom",
                            horizontal: "middle",
                        }
                    }}
                    loading={apiData.length === 0}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontSize: 14,
                        },
                    }}
                />
            </Box>
        </Box>
    );
}