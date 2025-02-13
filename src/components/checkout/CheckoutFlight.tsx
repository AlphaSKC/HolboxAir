import { Box, Divider, Grid2, Typography } from "@mui/material";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

// Add props interface
interface CheckoutFlightProps {
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso: string;
    numeroPasajeros: number;
    precioEstimado: number;
}

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return {
        date: date.toLocaleDateString('en-US', optionsDate),
        time: date.toLocaleTimeString('en-US', optionsTime)
    };
};

export default function CheckoutFlight(props: CheckoutFlightProps) {
    const fechaSalida = formatDateTime(props.fechaSalida);
    const fechaRegreso = formatDateTime(props.fechaRegreso);

    return (
        <Box sx={{ position: 'sticky', top: '20px', borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px" }}>
            <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                <LocalMallOutlinedIcon />
                Flight Summary
            </Typography>
            <Divider />
            <Grid2 container marginY={2} spacing={2}>
                <Grid2 size={12} sx={{ display: 'flex' }}>
                    <FlightTakeoffIcon sx={{ color: 'red', mr:'1vw' }} />
                    <Typography sx={{ fontWeight: 'bold', color:'red' }}>Origin:</Typography>
                    <Typography>{props.origen}</Typography>
                </Grid2>
                <Grid2 size={12} sx={{ display: 'flex' }}>
                    <FlightLandIcon sx={{ color: 'red', mr:'1vw' }} />
                    <Typography sx={{ fontWeight: 'bold', color:'red' }}>Destination:</Typography>
                    <Typography>{props.destino}</Typography>
                </Grid2>
                <Grid2 size={12} sx={{ display: 'flex' }}>
                    <Typography>Departure Date:</Typography>
                    <Typography>{fechaSalida.date} {fechaSalida.time}</Typography>
                </Grid2>
                <Grid2 size={12} sx={{ display: 'flex' }}>
                    <Typography>Return Date:</Typography>
                    <Typography>{fechaRegreso.date} {fechaRegreso.time}</Typography>
                </Grid2>
                <Grid2 size={12} sx={{ display: 'flex' }}>
                    <Typography>Number of Passengers:</Typography>
                    <Typography>{props.numeroPasajeros}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 size={12} display={'flex'} justifyContent={'space-between'} marginY={2}>
                <Typography>Total:</Typography>
                <Typography>${props.precioEstimado} USD</Typography>
            </Grid2>
        </Box>
    )
}