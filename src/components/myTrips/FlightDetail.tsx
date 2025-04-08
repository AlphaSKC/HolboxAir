import { Box, Button, CircularProgress, Divider, FormControlLabel, Grid2, Typography, Checkbox } from "@mui/material";
import { formatDateTimeUS } from "../../utils/utils";
import { Input } from "@nextui-org/react";
import { ChangeStatusReservacion, ConfirmFlight, SendEmailReservation } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { GetDollarPrice, GetFlightDetails } from "../../services/UserService";
import { defaultFlightDetails, FlightDetails } from "../../types/types";
import { CancelCircleIcon, CheckmarkSquare03Icon } from "hugeicons-react";
import PaypalButton from "./PaypalButton";
import { NavLink, useNavigate } from "react-router-dom";
import TimesOfRoutes from "../../utils/TimesOfRoutes.json";
import FlightSegment from "./FlightSegment";
import PaymentSummary from "./PaymentSummary";
import PassengerInfo from "./PassengerInfo";

interface FlightDetailProps {
    tipo: string;
    identificador: number;
}

export default function FlightDetail(props: FlightDetailProps) {

    const [flightDetails, setFlightDetails] = useState<FlightDetails>(defaultFlightDetails);
    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [dollarPrice, setDollarPrice] = useState(0);

    const [fullPrice, setFullPrice] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getFilghtDetails();
        getDollarPrice();
        setFullPrice(periodoNavideño());
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

    const getEstimatedArrivalTime = (origen: string, destino: string, fechaSalida: string) => {
        const route = TimesOfRoutes.find(route => route.origen === origen && route.destino === destino);
        if (!route) return null;

        const salida = new Date(fechaSalida);
        salida.setMinutes(salida.getMinutes() + route.tiempo);

        return formatDateTimeUS(salida.toISOString());
    };

    const periodoNavideño = () => {
        const fechaActual = new Date();
        const year = new Date().getFullYear();

        const inicio = new Date(year, 11, 24);
        const fin = new Date(year + 1, 0, 7);

        return fechaActual >= inicio && fechaActual <= fin;
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
            montoPagado: fullPrice ? flightDetails.precio : 200,
        }
        const response = await ConfirmFlight(data);
        if (response.success) {
            const email = {
                email: flightDetails.correoPasajero,
                code: flightDetails.codigo,
            }
            await SendEmailReservation(email);
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
                    <Typography className="Lato" variant="h6" fontWeight="bold" mb={2}>Flight Details</Typography>

                    {/* Mensaje de cambios en el vuelo */}
                    {flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Revision' && (
                        <Box sx={{ bgcolor: '#E0F7FA', padding: '16px', borderRadius: '10px', marginBottom: '20px', width: '100%', textAlign: 'center' }}>
                            <Typography className="Lato" variant="body1" fontWeight="bold" color="text.primary">
                                There are changes in your flight. Please review and accept or reject the changes as per your case.
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        {/* Sección de los vuelos */}
                        <Grid2 container spacing={2} sx={{ width: '100%' }}>
                            <Grid2 container size={{ xs: 12, md: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? 7 : 12 }} sx={{ height: 'fit-content', justifyContent: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? 'flex-start' : 'center' }}>
                                {/* Vuelo de salida */}
                                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', width: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? '100%' : '70%', mb: 2 }}>
                                    <FlightSegment
                                        origen={flightDetails?.origen}
                                        destino={flightDetails?.destino}
                                        fecha={flightDetails?.fechaSalida}
                                        getEstimatedArrivalTime={getEstimatedArrivalTime}
                                        status={flightDetails?.estado}
                                        price={fullPrice ? flightDetails?.precio : flightDetails?.precio / 2}
                                    />
                                </Box>

                                {/* Vuelo de regreso (opcional) */}
                                {flightDetails?.fechaRegreso && (
                                    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', width: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? '100%' : '70%', mb: 2 }}>
                                        <FlightSegment
                                            origen={flightDetails?.destino}
                                            destino={flightDetails?.origen}
                                            fecha={flightDetails?.fechaRegreso}
                                            getEstimatedArrivalTime={getEstimatedArrivalTime}
                                            isReturn={true}
                                            status={flightDetails?.estado}
                                            price={fullPrice ? flightDetails?.precio : flightDetails?.precio / 2}
                                        />
                                    </Box>
                                )}

                                {/* Check de terminos y condiciones */}
                                {((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) && (
                                    <>
                                        <Typography className="Lato" sx={{ fontSize: '2.2vh' }}>
                                            ⚠️ Upon proceeding with the payment, an amount equivalent to $200 USD will be charged in Mexican pesos to complete the reservation. The remaining balance will be paid at the airport on the day of the flight. You can check your balance in the "My Trips" section.
                                            <br /> <br />
                                            Please note that the Cancun airport tax (TUA) is not included; however, it can be exempted if you arrive into Cancun by air and depart to Holbox on the same day by presenting the boarding passes from your airline.
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isChecked}
                                                    onChange={(e) => setIsChecked(e.target.checked)}
                                                    sx={{
                                                        color: '#E68A00',
                                                        '&.Mui-checked': {
                                                            color: '#E68A00'
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography className="Lato" sx={{ fontSize: '2.2vh' }}>
                                                    I have read and accept the <NavLink to="/terms&conditions" target="_blank" style={{ color: '#E68A00', textDecoration: 'underline' }}>terms and conditions</NavLink>
                                                </Typography>
                                            }
                                        />
                                    </>
                                )}
                            </Grid2>
                            <Grid2 container size={{ xs: 12, md: ((flightDetails?.tipo === 'Cotizacion' && flightDetails?.estado === 'Aceptada') || (flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Disponible')) ? 5 : 12 }} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                {isChecked && (
                                    <PaypalButton
                                        totalValue={fullPrice ? parseFloat((flightDetails.precio * dollarPrice).toFixed(2)) : parseFloat((dollarPrice * 200).toFixed(2))}
                                        invoice={`Reservation from ${flightDetails.origen} to ${flightDetails.destino} on ${formatDateTimeUS(flightDetails.fechaSalida).date}`}
                                        onPaymentComplete={handlePaymentComplete}
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
                    {((flightDetails?.tipo === 'Reservacion' && flightDetails?.estado === 'Pagado') ||
                        (flightDetails?.tipo === 'Oferta' && flightDetails?.estado === 'Pagado')) && (
                            <>
                                <PaymentSummary
                                    totalPrice={flightDetails?.precio}
                                    amountPaid={flightDetails?.montoPagado ?? 0}
                                />
                                <Divider flexItem sx={{ my: '2vh' }} />
                            </>
                        )}

                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", width: "100%" }}>
                        <Typography className="Lato" component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            Principal Passenger Information
                        </Typography>
                        <Divider />
                        <PassengerInfo
                            name={flightDetails?.pasajeroPrincipal}
                            email={flightDetails?.correoPasajero}
                            phone={flightDetails?.telefonoPasajero}
                        />
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