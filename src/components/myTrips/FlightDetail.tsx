import { Box, Divider, Grid2, Typography } from "@mui/material";
import { formatDateTimeUS } from "../../utils/utils";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Input } from "@nextui-org/react";

interface FlightDetailProps {
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
    return (
        <Box sx={{ width: '80%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography className="Lato" variant="h6" fontWeight="bold" mb={2}>Flight Detail</Typography>

            {/* Vuelo de salida */}
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', mb: 2, width: { xs: '100%', md: '50%' } }}>
                <Grid2 container spacing={2}>
                    <Grid2 container size={8}>
                        <Grid2 size={12}>
                            <Typography className="Lato" fontWeight="bold" color="text.secondary">Departure - {formatDateTimeUS(props.fechaSalida).date}</Typography>
                        </Grid2>
                        <Grid2 container size={12} spacing={2} alignItems="center">
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
                        <Typography className="Lato" fontWeight="bold" sx={{color:'#E38A00'}} >${props.precio / 2}</Typography>
                    </Grid2>
                </Grid2>
            </Box>

            {/* Vuelo de regreso (opcional) */}
            {props.fechaRegreso && (
                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', marginBottom: "30px", width: { xs: '100%', md: '50%' } }}>
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
                            <Typography className="Lato" fontWeight="bold" sx={{color:'#E38A00'}}>${props.precio / 2}</Typography>
                        </Grid2>
                    </Grid2>
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
            <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px",width:'100%', display: props.numeroPasajeros > 1 ? 'block' : 'none' }}>
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