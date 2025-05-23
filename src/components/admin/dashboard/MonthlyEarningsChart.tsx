import { useEffect, useState } from "react";
import { GetDashboardGraphs } from "../../../services/AdminService";
import { monthNames } from "../../../utils/utils";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function MonthlyEarningsChart() {
    const currentYear = new Date().getFullYear();
    const [apiData, setApiData] = useState([]);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await GetDashboardGraphs();
            setApiData(response.ingresosMensuales);
        } catch (error) {
            console.error(error);
        }
    }

    const processChartData = (data: any) => {
        if (!data || data.length === 0) {
            return { xLabels: [], yData: [] };
        }

        const filteredData = data.filter((item: { año: number }) => item.año === selectedYear);

        const sortedData = filteredData.sort((a: { mes: number }, b: { mes: number }) => a.mes - b.mes);

        return {
            xLabels: sortedData.map((item: { mes: number }) => monthNames[item.mes - 1]),
            yData: sortedData.map((item: { ingresosTotales: number }) => item.ingresosTotales),
        };
    }

    const { xLabels, yData } = processChartData(apiData);

    const uniqueYears = Array.from(new Set(apiData.map((item: { año: number }) => item.año)));

    return (
        <Box sx={{ width: "100%", height: '100%', overflowX: "auto", bgcolor: "#ffff", borderRadius: 5, boxShadow: "0 0 10px #e8e8e8", padding: 2, mt: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Ingresos mensuales</Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="year-select-label">Año</InputLabel>
                <Select
                    labelId="year-select-label"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    label="Año"
                >
                    {uniqueYears.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ width: "100%" }}>
                <BarChart
                    borderRadius={5}
                    width={600}
                    height={400}
                    loading={apiData.length === 0}
                    barLabel="value"
                    colors={["#2196F3"]}
                    series={[
                        {
                            data: yData,
                            label: "Ingresos",
                            id: "ingresosId",
                        },
                    ]}
                    xAxis={[{ data: xLabels, scaleType: "band" }]}
                />
            </Box>
        </Box>
    );
}