import { Alert, Box, Button, Divider, Grid2, Slide, SlideProps, Snackbar, Typography } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CreateCotizacion } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
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

const labelStyle = { fontWeight: 'bold', color: '#e68a00', mr: '0.5vw' };
const iconStyle = { color: '#e68a00', mr: '0.5vw' };

export default function CheckoutForm(props: CheckoutFormProps) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
        "success"
    );
    const [alertOpen, setAlertOpen] = useState(false);

    const [formData, setFormData] = useState({
        pasajeroPrincipal: "",
        correoPasajero: "",
        telefonoPasajero: ""
    });

    const [additionalPassengers, setAdditionalPassengers] = useState<string[]>([]);

    useEffect(() => {
        setAdditionalPassengers(Array(props.numeroPasajeros - 1).fill(""));
    }, [props.numeroPasajeros]);

    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone: string) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handleDisable = () => {
        const allAdditionalPassengersFilled = additionalPassengers.length === (props.numeroPasajeros - 1) && additionalPassengers.every(passenger => passenger !== "" && passenger.trim().length !== 0);
        if (
            formData.pasajeroPrincipal !== "" &&
            isValidEmail(formData.correoPasajero) &&
            isValidPhone(formData.telefonoPasajero) &&
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

    const handleQuote = async () => {
        setIsLoading(true);
        const combinedData = { 
            ...props, 
            ...formData, 
            notas: additionalPassengers 
        };
        console.log(combinedData);
        try {
            const response = await CreateCotizacion(combinedData);
            if (response.success) {
                localStorage.setItem("quoteCompleted", 'true');
                navigate('/confirmationQuote');
            }
            else {
                setAlertMessage('Error al crear cotización. Inténtalo de nuevo.');
                setAlertSeverity('error');
                setAlertOpen(true);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fechaSalida = formatDateTime(props.fechaSalida);
    const fechaRegreso = formatDateTime(props.fechaRegreso);

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="left" />;
    }

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
                                <Input
                                    label="Phone"
                                    name="telefonoPasajero"
                                    radius="lg"
                                    maxLength={10}
                                    onChange={handleChange} />
                            </Grid2>
                        </Grid2>
                    </Box>
                    <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", marginBottom: "30px", display: props.numeroPasajeros > 1 ? 'block' : 'none' }}>
                        <Typography component="h1" fontSize={15} fontWeight={600} alignItems={'center'} display={'flex'} gap={2} marginBottom={2}>
                            <PermIdentityOutlinedIcon />
                            Additional Passengers Information
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2}>
                            {Array.from({ length: props.numeroPasajeros - 1 }).map((_, index) => (
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
                            Flight Summary
                        </Typography>
                        <Divider />
                        <Grid2 container marginY={2} spacing={2} >
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <FlightTakeoffIcon sx={iconStyle} />
                                <Typography sx={labelStyle}>Origin:</Typography>
                                <Typography>{props.origen}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <FlightLandIcon sx={iconStyle} />
                                <Typography sx={labelStyle}>Destination:</Typography>
                                <Typography>{props.destino}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <EventIcon sx={iconStyle} />
                                <Typography sx={labelStyle}>Departure Date:</Typography>
                                <Typography>{fechaSalida.date} {fechaSalida.time}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <EventIcon sx={iconStyle} />
                                <Typography sx={labelStyle}>Return Date:</Typography>
                                <Typography>{fechaRegreso.date} {fechaRegreso.time}</Typography>
                            </Grid2>
                            <Grid2 size={12} sx={{ display: 'flex' }}>
                                <PersonIcon sx={iconStyle} />
                                <Typography sx={labelStyle}>Number of Passengers:</Typography>
                                <Typography>{props.numeroPasajeros}</Typography>
                            </Grid2>
                        </Grid2>
                        <Divider />
                        <Grid2 size={12} display={'flex'} justifyContent={'space-between'} marginY={2}>
                            <Typography sx={labelStyle}>Total:</Typography>
                            <Typography>${props.precioEstimado} USD</Typography>
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
                            }} onClick={handleQuote} disabled={isDisabled || isLoading}>
                                Request Flight
                            </Button>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}
