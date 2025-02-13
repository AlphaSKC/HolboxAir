import { Box, Divider, Grid2, Typography } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Input } from "@nextui-org/react";

// Add props interface
interface PassengerFormProps {
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso: string;
    numeroPasajeros: number;
    precioEstimado: number;
}

export default function PassengerForm(props: PassengerFormProps) {
    return (
        <Box>
            <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px" }}>
                <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                    <PermIdentityOutlinedIcon />
                    Pasajero principal
                </Typography>
                <Divider />
                <Grid2 container marginY={2} spacing={2}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Input
                            label="Full Name"
                            radius="lg" />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Input
                            label="Email"
                            radius="lg" />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Input
                            label="Phone"
                            radius="lg" />
                    </Grid2>
                </Grid2>
            </Box>
            <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", display: props.numeroPasajeros > 1 ? 'block' : 'none' }}>
                <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                    <PermIdentityOutlinedIcon />
                    Información de pasajeros
                </Typography>
                <Divider />
                <Grid2 container marginY={2} spacing={2}>
                    {Array.from({ length: props.numeroPasajeros - 1 }).map((_, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <Input
                                label={`Passenger ${index + 2} Name`}
                                radius="lg" />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    )
}