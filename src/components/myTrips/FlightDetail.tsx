import { Box, Button, CircularProgress, Divider, FormControlLabel, Grid2, Typography, Checkbox } from "@mui/material";
import { formatDateTimeUS, getStatusColor, translateStatus } from "../../utils/utils";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Input } from "@nextui-org/react";
import { ChangeStatusReservacion, ConfirmFlight } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { GetDollarPrice, GetFlightDetails } from "../../services/UserService";
import { defaultFlightDetails, FlightDetails } from "../../types/types";
import { CancelCircleIcon, CheckmarkSquare03Icon } from "hugeicons-react";
import PaypalButton from "./PaypalButton";
import { NavLink, useNavigate } from "react-router-dom";

interface FlightDetailProps {
    tipo: string;
    identificador: number;
}

export default function FlightDetail(props: FlightDetailProps) {

    const [flightDetails, setFlightDetails] = useState<FlightDetails>(defaultFlightDetails);
    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [dollarPrice, setDollarPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getFilghtDetails();
        getDollarPrice();
    }, []);

    const getDollarPrice = async () => {
        try {
            const response = await GetDollarPrice();
            setDollarPrice(response.tipoCambio);
        }
        catch (error) {
            console.log(error);
        }
    }

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

    const showActionButtons = (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Revision');

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

    const handlePaymentComplete = async () => {
        const data = {
            tipo: flightDetails.tipo,
            identificador: flightDetails.identificador,
        }
        const response = await ConfirmFlight(data);
        if (response.success) {
            localStorage.setItem("payCompleted", "true");
            navigate("/confirmationFlight");
        }
    }

    return (
        <Box sx={{ width: { xs: '90%', md: '80%' }, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading ? (
                <CircularProgress sx={{ color: '#E68A00' }} />
            ) : (
                <>
                    <Typography className="Lato" variant="h6" fontWeight="bold" mb={2}>Flight Detail</Typography>

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
                        <Grid2 container spacing={2} sx={{ width: '100%' }}>
                            <Grid2 container size={{ xs: 12, md: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? 7 : 12 }} sx={{ height: 'fit-content', justifyContent: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? 'flex-start' : 'center' }}>
                                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', mb: 2, width: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? '100%' : '70%' }}>
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
                                            <Grid2 size={12}>
                                                <Typography className="Lato" variant="body2" color="text.secondary">Status: <span style={{ color: getStatusColor(flightDetails?.estado) }}>{translateStatus(flightDetails?.estado)}</span></Typography>
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
                                    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', width: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? '100%' : '70%', mb: 2 }}>
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
                                                <Grid2 size={12}>
                                                    <Typography className="Lato" variant="body2" color="text.secondary">Status: <span style={{ color: getStatusColor(flightDetails?.estado) }}>{translateStatus(flightDetails?.estado)}</span></Typography>
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

                                {/* Check de terminos y condiciones */}
                                {((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                sx={{
                                                    color: '#E38A00',
                                                    '&.Mui-checked': {
                                                        color: '#E38A00'
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography>
                                                I have read and accept the <NavLink to="/terms-of-use" target="_blank" style={{ color: '#E38A00', textDecoration: 'underline' }}>terms and conditions</NavLink>
                                            </Typography>
                                        }
                                    />
                                )}
                            </Grid2>
                            <Grid2 container size={{ xs: 12, md: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? 5 : 12 }} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                {isChecked && (
                                    <PaypalButton
                                        totalValue={parseFloat((dollarPrice * 200).toFixed(2))}
                                        invoice={`Reservation from ${flightDetails.origen} to ${flightDetails.destino} on ${formatDateTimeUS(flightDetails.fechaSalida).date}`}
                                        flightDetails={flightDetails}
                                        onPaymentComplete={handlePaymentComplete} // Pass the new function
                                    />
                                )}
                            </Grid2>
                        </Grid2>

                        {/* Botones de acciones */}
                        {showActionButtons && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                {flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Revision' && (
                                    <>
                                        <Button variant="outlined" size="large" style={{ borderRadius: "20px", color: "#FF4D4F", borderColor: "#FF4D4F" }} onClick={() => changeEstadoReservacion('Cancelado')}>
                                            <CancelCircleIcon />
                                        </Button>
                                        <Button variant="outlined" size="large" style={{ borderRadius: '20px', color: '#2196F3', borderColor: '#2196F3' }} onClick={() => changeEstadoReservacion('Disponible')}>
                                            <CheckmarkSquare03Icon />
                                        </Button>
                                    </>
                                )}

                            </Box>
                        )}
                    </Box>
                    <Divider flexItem sx={{ my: '2vh' }} />
                    {/* Precio - MontoPagado = Restante*/}
                    {(flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Pagado') || (flightDetails?.tipo === 'Oferta' && flightDetails?.estado === 'Pagado') && (
                        <>
                            <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", width: "60%" }}>
                                <Typography className="Lato" component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                                    Payment Summary
                                </Typography>
                                <Divider />
                                <Grid2 container marginY={2} spacing={2}>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                                        <Typography className="Lato" fontWeight="bold" color="#E68A00">Total Price:</Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                                        <Typography className="Lato">${flightDetails?.precio} USD</Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                                        <Typography className="Lato" fontWeight="bold" color="#E68A00">Amount Paid:</Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                                        <Typography className="Lato">${flightDetails?.montoPagado} USD</Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                                        <Typography className="Lato" fontWeight="bold" color="#E68A00">Remaining Amount:</Typography>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                                        <Typography className="Lato">${flightDetails?.precio - (flightDetails?.montoPagado ?? 0)} USD</Typography>
                                    </Grid2>
                                </Grid2>
                            </Box>
                            <Divider flexItem sx={{ my: '2vh' }} />
                        </>
                    )}

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
            )
            }
        </Box >
    );
}