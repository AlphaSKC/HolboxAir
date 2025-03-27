import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { GetDashboardGraphs } from "../../../services/AdminService";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

// const apiData = [
//     {
//         año: 2025,
//         mes: 3,
//         totalReservaciones: 18,
//         reservacionesCompletadas: 10,
//         reservacionesCanceladas: 7,
//     },
//     {
//         año: 2025,
//         mes: 2,
//         totalReservaciones: 4,
//         reservacionesCompletadas: 2,
//         reservacionesCanceladas: 1,
//     },
//     {
//         año: 2025,
//         mes: 1,
//         totalReservaciones: 6,
//         reservacionesCompletadas: 3,
//         reservacionesCanceladas: 3,
//     },
//     {
//         año: 2025,
//         mes: 4,
//         totalReservaciones: 8,
//         reservacionesCompletadas: 5,
//         reservacionesCanceladas: 3,
//     },
//     {
//         año: 2025,
//         mes: 5,
//         totalReservaciones: 10,
//         reservacionesCompletadas: 6,
//         reservacionesCanceladas: 4,
//     },
//     {
//         año: 2025,
//         mes: 6,
//         totalReservaciones: 12,
//         reservacionesCompletadas: 8,
//         reservacionesCanceladas: 4,
//     },
//     {
//         año: 2025,
//         mes: 7,
//         totalReservaciones: 14,
//         reservacionesCompletadas: 9,
//         reservacionesCanceladas: 5,
//     },
//     {
//         año: 2025,
//         mes: 8,
//         totalReservaciones: 16,
//         reservacionesCompletadas: 10,
//         reservacionesCanceladas: 6,
//     },
//     {
//         año: 2025,
//         mes: 9,
//         totalReservaciones: 18,
//         reservacionesCompletadas: 12,
//         reservacionesCanceladas: 6,
//     },
//     {
//         año: 2025,
//         mes: 10,
//         totalReservaciones: 20,
//         reservacionesCompletadas: 13,
//         reservacionesCanceladas: 7,
//     },
//     {
//         año: 2025,
//         mes: 11,
//         totalReservaciones: 22,
//         reservacionesCompletadas: 14,
//         reservacionesCanceladas: 8,
//     },
//     {
//         año: 2025,
//         mes: 12,
//         totalReservaciones: 24,
//         reservacionesCompletadas: 15,
//         reservacionesCanceladas: 9,
//     },
//     {
//         año: 2026,
//         mes: 1,
//         totalReservaciones: 5,
//         reservacionesCompletadas: 3,
//         reservacionesCanceladas: 2,
//     },
//     {
//         año: 2026,
//         mes: 2,
//         totalReservaciones: 7,
//         reservacionesCompletadas: 4,
//         reservacionesCanceladas: 3,
//     },
//     {
//         año: 2026,
//         mes: 3,
//         totalReservaciones: 12,
//         reservacionesCompletadas: 6,
//         reservacionesCanceladas: 6,
//     },
//     {
//         año: 2026,
//         mes: 4,
//         totalReservaciones: 10,
//         reservacionesCompletadas: 5,
//         reservacionesCanceladas: 4,
//     },
//     {
//         año: 2026,
//         mes: 5,
//         totalReservaciones: 8,
//         reservacionesCompletadas: 4,
//         reservacionesCanceladas: 4,
//     },
//     {
//         año: 2026,
//         mes: 6,
//         totalReservaciones: 15,
//         reservacionesCompletadas: 10,
//         reservacionesCanceladas: 5,
//     },
//     {
//         año: 2026,
//         mes: 7,
//         totalReservaciones: 18,
//         reservacionesCompletadas: 12,
//         reservacionesCanceladas: 6,
//     },
//     {
//         año: 2026,
//         mes: 8,
//         totalReservaciones: 20,
//         reservacionesCompletadas: 14,
//         reservacionesCanceladas: 6,
//     },
//     {
//         año: 2026,
//         mes: 9,
//         totalReservaciones: 22,
//         reservacionesCompletadas: 15,
//         reservacionesCanceladas: 7,
//     },
//     {
//         año: 2026,
//         mes: 10,
//         totalReservaciones: 25,
//         reservacionesCompletadas: 17,
//         reservacionesCanceladas: 8,
//     },
//     {
//         año: 2026,
//         mes: 11,
//         totalReservaciones: 28,
//         reservacionesCompletadas: 20,
//         reservacionesCanceladas: 8,
//     },
//     {
//         año: 2026,
//         mes: 12,
//         totalReservaciones: 30,
//         reservacionesCompletadas: 22,
//         reservacionesCanceladas: 8,
//     },
// ];


export default function MonthlyReservationsChart() {
    const [apiData, setApiData] = useState([]);
    const [selectedYear, setSelectedYear] = useState<number | string>("Todos");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await GetDashboardGraphs();
            setApiData(response.clasificacionMensual);
        }
        catch (error) {
            console.error(error);
        }
    }

    const processChartData = (data: any) => {
        const filteredData = selectedYear === "Todos"
            ? data
            : data.filter((item: { año: number }) => item.año === selectedYear);

        const sortedData = filteredData.sort((a: { año: number; mes: number }, b: { año: number; mes: number }) => {
            if (a.año === b.año) {
                return a.mes - b.mes;
            }
            return a.año - b.año;
        });

        return {
            xLabels: sortedData.map((item: { mes: number; año: any }) => `${monthNames[item.mes - 1]} ${item.año}`),
            completedData: sortedData.map((item: { reservacionesCompletadas: any }) => item.reservacionesCompletadas),
            canceledData: sortedData.map((item: { reservacionesCanceladas: any }) => item.reservacionesCanceladas),
        };
    };

    const { xLabels, completedData, canceledData } = processChartData(apiData);

    const uniqueYears = Array.from(new Set(apiData.map((item: { año: number }) => item.año)));

    return (
        <Box sx={{ width: "40vw", overflowX: "auto", bgcolor: "#ffff", borderRadius: 5, boxShadow: "0 0 10px #e8e8e8", padding: 2, mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Reservaciones mensuales</Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="year-select-label">Año</InputLabel>
                <Select
                    labelId="year-select-label"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    label="Año"
                >
                    <MenuItem value="Todos">Todos</MenuItem>
                    {uniqueYears.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <BarChart
                borderRadius={5}

                colors={["#2196F3", "#FF4D4F"]}
                width={Math.max(600, xLabels.length * 100)}
                height={400}
                loading={apiData.length === 0}
                series={[
                    {
                        data: completedData, label: "Completadas", id: "completedId", stack: "total", highlightScope: {
                            'highlighted': 'item',
                            'faded': 'global',
                        },
                    },
                    {
                        data: canceledData, label: "Canceladas", id: "canceledId", stack: "total", highlightScope: {
                            'highlighted': 'item',
                            'faded': 'global',
                        },
                    },
                ]}
                barLabel="value"
                xAxis={[{ data: xLabels, scaleType: "band" }]}
            />

        </Box>
    );
}