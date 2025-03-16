import { useState, useEffect } from "react";
import { Box, Divider, Grid2, Typography, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { Input } from "@nextui-org/react";
import PaypalButton from "../myTrips/PaypalButton";
import { formatDateTimeUS } from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateReservacionOferta, GetDollarPrice } from "../../services/UserService";
import AlertSnackbar from "../general/AlertSnackbar";

interface CheckoutDealFormProps {
    ofertaID: number;
    origen: string;
    destino: string;
    fechaSalida: string;
    disponibilidad: number;
    precio: number;
}

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    return {
        date: date.toLocaleDateString("en-US", optionsDate),
        time: date.toLocaleTimeString("en-US", optionsTime),
    };
};

export default function CheckoutDealForm(props: CheckoutDealFormProps) {
    const [numeroPasajeros, setNumeroPasajeros] = useState(1);
    const [formData, setFormData] = useState({
        pasajeroPrincipal: "",
        correoPasajero: "",
        telefonoPasajero: ""
    });
    const [additionalPassengers, setAdditionalPassengers] = useState<string[]>([]);
    const [countryCode, setCountryCode] = useState<CountryCode>('MX');
    const [isVisible, setIsVisible] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");
    
    const [dollarPrice, setDollarPrice] = useState(0);

    const navigate = useNavigate();

    const handleAlertClose = () => setAlertOpen(false);

    useEffect(() => {
        setAdditionalPassengers(Array(numeroPasajeros - 1).fill(""));
    }, [numeroPasajeros]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
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

    const isValidPhone = (phone: string, countryCode: CountryCode) => {
        const phoneNumber = parsePhoneNumberFromString(phone, countryCode.toUpperCase() as CountryCode);
        return phoneNumber ? phoneNumber.isValid() : false;
    };

    const handleDisable = () => {
        const allAdditionalPassengersFilled = additionalPassengers.length === (numeroPasajeros - 1) && additionalPassengers.every(passenger => passenger !== "" && passenger.trim().length !== 0);
        if (
            formData.pasajeroPrincipal !== "" &&
            isValidEmail(formData.correoPasajero) &&
            isValidPhone(formData.telefonoPasajero, countryCode) &&
            allAdditionalPassengersFilled
        ) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        handleDisable();
    }, [formData, additionalPassengers]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdditionalPassengerChange = (index: number, value: string) => {
        const updatedPassengers = [...additionalPassengers];
        updatedPassengers[index] = value;
        setAdditionalPassengers(updatedPassengers);
    };

    const handlePaymentComplete = async () => {
        try {
            const reservacion = {
                ofertaID: props.ofertaID,
                pasajeroPrincipal: formData.pasajeroPrincipal,
                correoPasajero: formData.correoPasajero,
                telefonoPasajero: formData.telefonoPasajero,
                numeroPasajeros: numeroPasajeros,
                precioTotal: props.precio * numeroPasajeros,
                notas: additionalPassengers,
                montoPagado: props.precio * numeroPasajeros,
            }
            const response = await CreateReservacionOferta(reservacion);
            if (response.success) {
                localStorage.setItem("payCompleted", "true");
                navigate('/confirmationFlight');
            }else{
                setAlertSeverity("error");
                setAlertMessage("An error occurred while processing your payment. Please try again later.");
                setAlertOpen(true);
            }
        }
        catch (error) {
            setAlertSeverity("error");
            setAlertMessage("An error occurred while processing your payment. Please try again later.");
            setAlertOpen(true);
        }
    }

    const fechaSalida = formatDateTime(props.fechaSalida);

    return (
        <Box>
            <Grid2 container spacing={2} marginY={2}>
                <Grid2 size={{ sm: 6, md: 8 }}>
                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px" }}>
                        <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            <PermIdentityOutlinedIcon />
                            Principal Passenger Information
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <Input
                                    label="Full Name"
                                    name="pasajeroPrincipal"
                                    radius="lg"
                                    onChange={handleChange} />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <Input
                                    label="Email"
                                    name="correoPasajero"
                                    radius="lg"
                                    onChange={handleChange} />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <PhoneInput
                                    country={'mx'}
                                    countryCodeEditable={false}
                                    enableSearch={true}
                                    value={formData.telefonoPasajero}
                                    onChange={(e, phone) => {
                                        if (phone && 'countryCode' in phone) {
                                            setCountryCode(phone.countryCode.toUpperCase() as CountryCode);
                                        }
                                        setFormData({ ...formData, telefonoPasajero: e });
                                    }}
                                    inputStyle={{ width: '100%', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '15px', paddingLeft: '45px', height: '55px' }}
                                />
                            </Grid2>
                        </Grid2>
                    </Box>
                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px" }}>
                        <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            <PermIdentityOutlinedIcon />
                            Number of Passengers
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                <Select
                                    value={numeroPasajeros}
                                    onChange={(e) => setNumeroPasajeros(Number(e.target.value))}
                                    fullWidth
                                >
                                    {Array.from({ length: props.disponibilidad }, (_, i) => i + 1).map(num => (
                                        <MenuItem key={num} value={num}>{num}</MenuItem>
                                    ))}
                                </Select>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", display: numeroPasajeros > 1 ? 'block' : 'none' }}>
                        <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            <PermIdentityOutlinedIcon />
                            Additional Passengers Information
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2}>
                            {Array.from({ length: numeroPasajeros - 1 }).map((_, index) => (
                                <Grid2 key={index} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                    <Input
                                        label={`Name of Passenger ${index + 2}`}
                                        radius="lg"
                                        onChange={(e) => handleAdditionalPassengerChange(index, e.target.value)}
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
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
                </Grid2>
                <Grid2 size={{ sm: 6, md: 4 }}>
                    <Box sx={{ position: 'sticky', top: '20px', borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px" }}>
                        <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            <LocalMallOutlinedIcon />
                            Deal Summary
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2} >
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <FlightTakeoffIcon sx={{ color: '#e68a00', mr: '0.5vw' }} />
                                <Typography sx={{ fontWeight: 'bold', color: '#e68a00', mr: '0.5vw' }}>Origin:</Typography>
                                <Typography>{props.origen}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <FlightLandIcon sx={{ color: '#e68a00', mr: '0.5vw' }} />
                                <Typography sx={{ fontWeight: 'bold', color: '#e68a00', mr: '0.5vw' }}>Destination:</Typography>
                                <Typography>{props.destino}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <EventIcon sx={{ color: '#e68a00', mr: '0.5vw' }} />
                                <Typography sx={{ fontWeight: 'bold', color: '#e68a00', mr: '0.5vw' }}>Departure Date:</Typography>
                                <Typography>{fechaSalida.date} {fechaSalida.time}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <GroupIcon sx={{ color: '#e68a00', mr: '0.5vw' }} />
                                <Typography sx={{ fontWeight: 'bold', color: '#e68a00', mr: '0.5vw' }}>Number of Passengers:</Typography>
                                <Typography>{numeroPasajeros}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <AttachMoneyIcon sx={{ color: '#e68a00', mr: '0.5vw' }} />
                                <Typography sx={{ fontWeight: 'bold', color: '#e68a00', mr: '0.5vw' }}>Total Price:</Typography>
                                <Typography>${props.precio * numeroPasajeros} USD</Typography>
                            </Grid2>
                        </Grid2>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%' }}>
                            {isVisible && isChecked && (
                                <PaypalButton
                                    totalValue={parseFloat(((props.precio * numeroPasajeros) * dollarPrice).toFixed(2))}
                                    invoice={`Reservation from  to ${props.destino} on ${formatDateTimeUS(props.fechaSalida).date}`}
                                    onPaymentComplete={handlePaymentComplete}
                                />
                            )}
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
            <AlertSnackbar
                open={alertOpen}
                severity={alertSeverity}
                message={alertMessage}
                onClose={handleAlertClose}
            />
        </Box>
    );
}