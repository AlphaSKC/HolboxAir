import { useState, useEffect } from "react";
import { Box, Button, Divider, Grid2, Typography, Select, MenuItem } from "@mui/material";
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
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setAdditionalPassengers(Array(numeroPasajeros - 1).fill(""));
    }, [numeroPasajeros]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <Button className="Lato" sx={{
                                width: '100%',
                                borderRadius: '10px',
                                padding: '10px',
                                color: 'white',
                                backgroundColor: '#e68a00',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: '#e68a00',
                                },
                                '&:disabled': {
                                    backgroundColor: 'gray',
                                    color: 'white',
                                }
                            }}
                                onClick={() => {
                                    const combinedData = {
                                        OfertaID: props.ofertaID,
                                        PasajeroPrincipal: formData.pasajeroPrincipal,
                                        CorreoPasajero: formData.correoPasajero,
                                        TelefonoPasajero: formData.telefonoPasajero,
                                        NumeroPasajeros: numeroPasajeros,
                                        PrecioTotal: props.precio * numeroPasajeros,
                                        Notas: additionalPassengers
                                    };
                                    console.log(combinedData);
                                }}
                                disabled={isDisabled}>
                                Request Deal
                            </Button>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}