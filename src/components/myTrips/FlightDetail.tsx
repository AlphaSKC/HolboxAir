import { Box, Button, Chip, CircularProgress, Divider, Grid2, Typography } from "@mui/material";
import { formatDateTimeUS, getStatusColor, translateStatus, translateType } from "../../utils/utils";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Input } from "@nextui-org/react";
import { ChangeStatusCotizacion, ChangeStatusReservacion } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { GetFlightDetails } from "../../services/UserService";
import { defaultFlightDetails, FlightDetails } from "../../types/types";
import { CancelCircleIcon, CheckmarkSquare03Icon, Payment01Icon } from "hugeicons-react";

interface FlightDetailProps {
    tipo: string;
    identificador: number;
}

export default function FlightDetail(props: FlightDetailProps) {

    const [flightDetails, setFlightDetails] = useState<FlightDetails>(defaultFlightDetails);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFilghtDetails();
    }, []);

    const getFilghtDetails = async () => {
        setLoading(true);
        try {
            const data = {
                identificador: props.identificador,
                tipo: props.tipo
            }
            const response = await GetFlightDetails(data);
            setFlightDetails(response.result);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const showActionButtons = (flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Pendiente') ||
        (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Pendiente') ||
        (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Revision');

    const changeEstadoReservacion = async (nuevoEstado: string) => {
        try {
            const status = { status: nuevoEstado };
            await ChangeStatusReservacion(props.identificador, status);
            setFlightDetails({ ...flightDetails, estado: nuevoEstado });
        }
        catch (error) {
            console.log(error);
        }
    }

    const changeEstadoCotizacion = async (nuevoEstado: string) => {
        try {
            const status = { status: nuevoEstado };
            await ChangeStatusCotizacion(props.identificador, status);
            setFlightDetails({ ...flightDetails, estado: nuevoEstado });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ width: { xs: '90%', md: '80%' }, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading ? (
                <CircularProgress sx={{ color: '#E68A00' }} />
            ) : (
                <>
                    <Typography className="Lato" variant="h6" fontWeight="bold" mb={2}>Flight Detail</Typography>

                    {/* Tipo de vuelo y estado */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
                        <Chip className="Lato" label={translateType(flightDetails?.tipo)} sx={{ bgcolor: flightDetails?.tipo === 'Cotizacion' ? '#D4D4D4' : '#E68A00', fontSize: '2vh', padding: '20px 10px', color: flightDetails?.tipo === 'Cotizacion' ? 'black' : 'white' }} />
                        <Chip className="Lato" label={translateStatus(flightDetails?.estado)} sx={{ bgcolor: getStatusColor(flightDetails?.estado), fontSize: '2vh', padding: '20px 10px' }} />
                    </Box>

                    {/* Mensaje de cambios en el vuelo */}
                    {flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Revision' && (
                        <Box sx={{ bgcolor: '#E0F7FA', padding: '16px', borderRadius: '10px', marginBottom: '20px', width: '100%', textAlign: 'center' }}>
                            <Typography className="Lato" variant="body1" fontWeight="bold" color="text.primary">
                                There are changes in your flight. Please review and accept or reject the changes as per your case.
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        {/* Vuelo de salida */}
                        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', mb: 2, width: { xs: '100%', md: '70%' } }}>
                            <Grid2 container spacing={2}>
                                <Grid2 container size={8}>
                                    <Grid2 size={12}>
                                        <Typography className="Lato" fontWeight="bold" color="text.secondary">Departure - {formatDateTimeUS(flightDetails?.fechaSalida).date}</Typography>
                                    </Grid2>
                                    <Grid2 container size={12} spacing={3} alignItems="center">
                                        <Grid2 size={1}>
                                            <FlightTakeoffIcon sx={{ color: '#E38A00' }} />
                                        </Grid2>
                                        <Grid2 size={11}>
                                            <Typography className="Lato">{flightDetails?.origen} → {flightDetails?.destino}</Typography>
                                            <Typography className="Lato" variant="body2" color="text.secondary">
                                                {formatDateTimeUS(flightDetails?.fechaSalida).time}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                                <Grid2 size={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Divider orientation="vertical" flexItem variant="fullWidth" />
                                </Grid2>
                                <Grid2 size={3} textAlign="right" alignContent={"center"}>
                                    <Typography className="Lato" fontWeight="bold" sx={{ color: '#E38A00' }}>
                                        ${flightDetails?.fechaRegreso ? flightDetails?.precio / 2 : flightDetails?.precio}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </Box>

                        {/* Vuelo de regreso (opcional) */}
                        {flightDetails?.fechaRegreso && (
                            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', width: { xs: '100%', md: '70%' }, mb: 2 }}>
                                <Grid2 container spacing={2}>
                                    <Grid2 container size={8}>
                                        <Grid2 size={12}>
                                            <Typography className="Lato" fontWeight="bold" color="text.secondary">Return - {formatDateTimeUS(flightDetails?.fechaRegreso).date}</Typography>
                                        </Grid2>
                                        <Grid2 container size={12} alignItems="center">
                                            <Grid2 size={1}>
                                                <FlightLandIcon sx={{ color: '#E38A00' }} />
                                            </Grid2>
                                            <Grid2 size={11}>
                                                <Typography className="Lato">{flightDetails?.destino} → {flightDetails?.origen}</Typography>
                                                <Typography className="Lato" variant="body2" color="text.secondary">
                                                    {formatDateTimeUS(flightDetails?.fechaRegreso).time}
                                                </Typography>
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 size={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Divider orientation="vertical" flexItem variant="fullWidth" />
                                    </Grid2>
                                    <Grid2 size={3} textAlign="right" alignContent={"center"}>
                                        <Typography className="Lato" fontWeight="bold" sx={{ color: '#E38A00' }}>${flightDetails?.precio / 2}</Typography>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        )}

                        {/* Botones de acciones */}
                        {showActionButtons && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}}>
                                {flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Pendiente' && (
                                    <Button variant="outlined" size="large" style={{ borderRadius: "20px", color: "#FF4D4F", borderColor: "#FF4D4F" }} onClick={() => changeEstadoCotizacion('Cancelado')}>
                                        <CancelCircleIcon />
                                    </Button>
                                )}
                                {flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Revision' && (
                                    <>
                                        <Button variant="outlined" size="large" style={{ borderRadius: "20px", color: "#FF4D4F", borderColor: "#FF4D4F" }} onClick={() => changeEstadoReservacion('Cancelado')}>
                                            <CancelCircleIcon />
                                        </Button>
                                        <Button variant="outlined" size="large" style={{ borderRadius: '20px', color: '#2196F3', borderColor: '#2196F3' }} onClick={() => changeEstadoReservacion('Pendiente')}>
                                            <CheckmarkSquare03Icon />
                                        </Button>
                                    </>
                                )}
                                {flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Pendiente' && (
                                    <>
                                        <Button variant="outlined" size="large" style={{ borderRadius: "20px", color: "#FF4D4F", borderColor: "#FF4D4F" }} onClick={() => changeEstadoReservacion('Cancelado')}>
                                            <CancelCircleIcon />
                                        </Button>
                                        <Button variant="outlined" size="large" style={{ borderRadius: "20px", color: "#00A86B", borderColor: "#00A86B" }}>
                                            <Payment01Icon />
                                        </Button>
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>
                    <Divider flexItem sx={{ my: '2vh' }} />
                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", width: "100%" }}>
                        <Typography className="Lato" component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            Principal Passenger Information
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <Input
                                    label="Full Name"
                                    value={flightDetails?.pasajeroPrincipal}
                                    radius="lg"
                                    disabled
                                    className="Lato"
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <Input
                                    label="Email"
                                    value={flightDetails?.correoPasajero}
                                    radius="lg"
                                    disabled
                                    className="Lato"
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <Input
                                    label="Phone"
                                    value={flightDetails?.telefonoPasajero}
                                    radius="lg"
                                    disabled
                                    className="Lato"
                                />
                            </Grid2>
                        </Grid2>
                    </Box>

                    {/* Additional Passengers Information */}
                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", width: '100%', display: flightDetails?.numeroPasajeros > 1 ? 'block' : 'none' }}>
                        <Typography className="Lato" component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            Additional Passengers Information
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2}>
                            {flightDetails?.notas.map((nota, index) => (
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
                </>
            )}
        </Box>
    );
}