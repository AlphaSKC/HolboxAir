import { Box, Divider, Grid2, Typography } from "@mui/material";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { formatDateTimeUS, getStatusColor, translateStatus } from "../../utils/utils";

interface FlightSegmentProps {
    origen: string;
    destino: string;
    fecha: string;
    isReturn?: boolean;
    status: string;
    price: number;
    getEstimatedArrivalTime: (origen: string, destino: string, fechaSalida: string) => { time: string } | null;
}

export default function FlightSegment({
    origen,
    destino,
    fecha,
    isReturn = false,
    status,
    price,
    getEstimatedArrivalTime,
}: FlightSegmentProps) {
    return (
        <Grid2 container spacing={2}>
            <Grid2 container size={8}>
                <Grid2 size={12}>
                    <Typography className="Lato" fontWeight="bold" color="text.secondary">
                        {isReturn ? "Return" : "Departure"} - {formatDateTimeUS(fecha).date}
                    </Typography>
                </Grid2>
                <Grid2 container size={12} alignItems="center">
                    <Grid2 size={1}>
                        {isReturn ? (
                            <FlightLandIcon sx={{ color: "#E68A00" }} />
                        ) : (
                            <FlightTakeoffIcon sx={{ color: "#E68A00" }} />
                        )}
                    </Grid2>
                    <Grid2 size={11}>
                        <Typography className="Lato">
                            {origen} → {destino}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "3vw" }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography className="Lato" variant="body2" color="text.secondary">
                                    {formatDateTimeUS(fecha).time}
                                </Typography>
                                <Typography className="Lato" variant="caption" color="text.secondary">
                                    Departing
                                </Typography>
                            </Box>
                            <Typography>→</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography className="Lato" variant="body2" color="text.secondary">
                                    {getEstimatedArrivalTime(origen, destino, fecha)?.time}
                                </Typography>
                                <Typography className="Lato" variant="caption" color="text.secondary">
                                    Arriving
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2 size={12}>
                    <Typography className="Lato" variant="body2" color="text.secondary">
                        Status:{" "}
                        <span style={{ color: getStatusColor(status) }}>
                            {translateStatus(status)}
                        </span>
                    </Typography>
                </Grid2>
            </Grid2>
            <Grid2 size={1} sx={{ display: "flex", justifyContent: "center" }}>
                <Divider orientation="vertical" flexItem variant="fullWidth" />
            </Grid2>
            <Grid2 size={3} textAlign="right" alignContent={"center"}>
                <Typography className="Lato" fontWeight="bold" sx={{ color: "#E68A00" }}>
                    ${price}
                </Typography>
            </Grid2>
        </Grid2>
    );
}