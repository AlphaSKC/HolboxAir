import { Box, Button, Chip, Divider, Grid2, Typography } from "@mui/material";
import { formatDateTimeUS, getStatusColor, translateStatus, translateType } from "../../utils/utils";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Input } from "@nextui-org/react";

interface FlightDetailProps {
    tipo: string;
    identificador: number;
    pasajeroPrincipal: string;
    correoPasajero: string;
    telefonoPasajero: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso?: string;
    numeroPasajeros: number;
    precio: number;
    estado: string;
    codigo: string;
    fechaCreacion: string;
    notas: string[];
}

export default function FlightDetail(props: FlightDetailProps) {

    const showActionButtons = (props.tipo === 'Cotizacion' && props.estado === 'Pendiente') ||
        (props.tipo === 'Reservacion' && props.estado === 'Pendiente');

    return (
        <Box sx={{ width: { xs: '90%', md: '80%' }, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography className="Lato" variant="h6" fontWeight="bold" mb={2}>Flight Detail</Typography>

            {/* Tipo de vuelo y estado */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
                <Chip className="Lato" label={translateType(props.tipo)} sx={{ bgcolor: props.tipo === 'Cotizacion' ? '#D4D4D4' : '#E68A00', fontSize: '2vh', padding: '10px' }} />
                <Chip className="Lato" label={translateStatus(props.estado)} sx={{ bgcolor: getStatusColor(props.estado), fontSize: '2vh', padding: '10px' }} />
            </Box>

            {/* Vuelo de salida */}
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', mb: 2, width: { xs: '100%', md: '70%' } }}>
                <Grid2 container spacing={2}>
                    <Grid2 container size={8}>
                        <Grid2 size={12}>
                            <Typography className="Lato" fontWeight="bold" color="text.secondary">Departure - {formatDateTimeUS(props.fechaSalida).date}</Typography>
                        </Grid2>
                        <Grid2 container size={12} spacing={3} alignItems="center">
                            <Grid2 size={1}>
                                <FlightTakeoffIcon sx={{ color: '#E38A00' }} />
                            </Grid2>
                            <Grid2 size={11}>
                                <Typography className="Lato">{props.origen} → {props.destino}</Typography>
                                <Typography className="Lato" variant="body2" color="text.secondary">
                                    {formatDateTimeUS(props.fechaSalida).time}
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 size={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Divider orientation="vertical" flexItem variant="fullWidth" sx={{ borderColor: 'black' }} />
                    </Grid2>
                    <Grid2 size={3} textAlign="right" alignContent={"center"}>
                        <Typography className="Lato" fontWeight="bold" sx={{ color: '#E38A00' }}>
                            ${props.fechaRegreso ? props.precio / 2 : props.precio}
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>

            {/* Vuelo de regreso (opcional) */}
            {props.fechaRegreso && (
                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', marginBottom: "30px", width: { xs: '100%', md: '70%' } }}>
                    <Grid2 container spacing={2}>
                        <Grid2 container size={8}>
                            <Grid2 size={12}>
                                <Typography className="Lato" fontWeight="bold" color="text.secondary">Return - {formatDateTimeUS(props.fechaRegreso).date}</Typography>
                            </Grid2>
                            <Grid2 container size={12} alignItems="center">
                                <Grid2 size={1}>
                                    <FlightLandIcon sx={{ color: '#E38A00' }} />
                                </Grid2>
                                <Grid2 size={11}>
                                    <Typography className="Lato">{props.destino} → {props.origen}</Typography>
                                    <Typography className="Lato" variant="body2" color="text.secondary">
                                        {formatDateTimeUS(props.fechaRegreso).time}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                        <Grid2 size={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Divider orientation="vertical" flexItem variant="fullWidth" sx={{ borderColor: 'black' }} />
                        </Grid2>
                        <Grid2 size={3} textAlign="right" alignContent={"center"}>
                            <Typography className="Lato" fontWeight="bold" sx={{ color: '#E38A00' }}>${props.precio / 2}</Typography>
                        </Grid2>
                    </Grid2>
                </Box>
            )}

            {/* Botones de acciones */}
            {showActionButtons && (
                <Box sx={{ display: 'flex', gap: 2, borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", mb: '30px' }}>
                    {props.tipo === 'Cotizacion' && props.estado === 'Pendiente' && (
                        <Button variant="contained" color="error">
                            Cancelar
                        </Button>
                    )}
                    {props.tipo === 'Reservacion' && props.estado === 'Pendiente' && (
                        <>
                            <Button variant="contained" color="error">
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary">
                                Pagar
                            </Button>
                        </>
                    )}
                </Box>
            )}

            {/* Principal Passenger Information */}
            <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", width: "100%" }}>
                <Typography className="Lato" component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                    Principal Passenger Information
                </Typography>
                <Divider />
                <Grid2 container marginY={2} spacing={2}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Input
                            label="Full Name"
                            value={props.pasajeroPrincipal}
                            radius="lg"
                            disabled
                            className="Lato"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Input
                            label="Email"
                            value={props.correoPasajero}
                            radius="lg"
                            disabled
                            className="Lato"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Input
                            label="Phone"
                            value={props.telefonoPasajero}
                            radius="lg"
                            disabled
                            className="Lato"
                        />
                    </Grid2>
                </Grid2>
            </Box>

            {/* Additional Passengers Information */}
            <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", width: '100%', display: props.numeroPasajeros > 1 ? 'block' : 'none' }}>
                <Typography className="Lato" component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                    Additional Passengers Information
                </Typography>
                <Divider />
                <Grid2 container marginY={2} spacing={2}>
                    {props.notas.map((nota, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <Input
                                label={`Name of Passenger ${index + 2}`}
                                value={nota}
                                radius="lg"
                                disabled
                                className="Lato"
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    );
}