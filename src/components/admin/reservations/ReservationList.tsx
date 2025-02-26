import { Box, Grid2, Typography, CircularProgress, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { GetReservaciones } from "../../../services/AdminService";
import { Card, CardBody, CardHeader, CardFooter, Image, Input } from "@nextui-org/react";
import { AccountCircle } from "@mui/icons-material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ViewIcon } from "hugeicons-react";

interface Reservation {
    reservacionID: number;
    pasajeroPrincipal: string;
    correoPasajero: string;
    telefonoPasajero: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso: string;
    numeroPasajeros: number;
    precioTotal: number;
    codigoReservacion: string;
    notas: string[];
    fechaReserva: string;
    estado: string;
}

const defaultReservation: Reservation = {
    reservacionID: 0,
    pasajeroPrincipal: "",
    correoPasajero: "",
    telefonoPasajero: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaRegreso: "",
    numeroPasajeros: 0,
    precioTotal: 0,
    codigoReservacion: "",
    notas: [],
    fechaReserva: "",
    estado: "",
}

const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return { date: "N/A", time: "" };
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return {
        date: date.toLocaleDateString("es-ES", optionsDate),
        time: date.toLocaleTimeString("es-ES", optionsTime),
    };
};

const getStatusColor = (estado: string) => {
    switch (estado) {
        case "Pagado":
            return "#00A86B";
        case "Pendiente":
            return "#ffcc00";
        case "Cancelado":
            return "#FF4D4F";
        default:
            return "gray";
    }
};

export default function ReservationList() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<Reservation>(defaultReservation);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await GetReservaciones();
            setReservations(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const closeModal = () => setOpenModal(false);

    return (
        <Box>
            {loading ? (
                <CircularProgress sx={{ color: "#E68A00" }} />
            ) : (
                <Grid2 container spacing={2}>
                    {reservations.map((reservation) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={reservation.reservacionID}>
                            <Card className="py-4" style={{ height: "100%", position: "relative" }}>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "1vh",
                                        right: "1vw",
                                        width: { xs: "30px", md: "40px" },
                                        height: { xs: "30px", md: "40px" },
                                        borderRadius: "50%",
                                        backgroundColor: getStatusColor(reservation.estado),
                                    }}
                                />
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <Typography
                                        sx={{
                                            fontSize: "2.5vh",
                                            fontWeight: "bold",
                                            color: "#2E2E2E",
                                        }}
                                    >
                                        {reservation.pasajeroPrincipal}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "2vh",
                                                fontWeight: "bold",
                                                color: "#7D7D7D",
                                            }}
                                        >
                                            {reservation.origen} - {reservation.destino}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <FlightTakeoffIcon sx={{ color: "#E38A00" }} />
                                        <Typography
                                            sx={{
                                                fontSize: "1.8vh",
                                                fontWeight: "bold",
                                                color: "#7D7D7D",
                                            }}
                                        >
                                            {formatDateTime(reservation.fechaSalida).date} -{" "}
                                            {formatDateTime(reservation.fechaSalida).time}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <FlightLandIcon sx={{ color: "#E38A00" }} />
                                        <Typography
                                            sx={{
                                                fontSize: "1.8vh",
                                                fontWeight: "bold",
                                                color: "#7D7D7D",
                                            }}
                                        >
                                            {formatDateTime(reservation.fechaRegreso).date}
                                            {formatDateTime(reservation.fechaRegreso).date !==
                                                "N/A" &&
                                                ` - ${formatDateTime(reservation.fechaRegreso).time
                                                }`}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <AccountCircle sx={{ color: "#E38A00" }} />
                                        <Typography
                                            sx={{
                                                fontSize: "1.8vh",
                                                fontWeight: "bold",
                                                color: "#7D7D7D",
                                            }}
                                        >
                                            {reservation.numeroPasajeros}{" "}
                                            {reservation.numeroPasajeros > 1
                                                ? "Pasajeros"
                                                : "Pasajero"}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <AttachMoneyIcon sx={{ color: '#e6a800' }} />
                                        <Typography
                                            sx={{
                                                fontSize: "1.8vh",
                                                fontWeight: "bold",
                                                color: "#7D7D7D",
                                            }}
                                        >
                                            {reservation.precioTotal} USD
                                        </Typography>
                                    </Box>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://heroui.com/images/hero-card-complete.jpeg"
                                        width={"100%"}
                                    />
                                </CardBody>
                                <CardFooter className="justify-center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            borderRadius: "20px",
                                            color: "#a8a8a8",
                                            borderColor: "#a8a8a8",
                                        }}
                                        onClick={() => {
                                            setOpenModal(true)
                                            setSelectedReservation(reservation)
                                        }}
                                    >
                                        <ViewIcon />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <Modal open={openModal} onClose={closeModal}>
                <Box
                    component="form"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        height: { xs: "70%", md: "70%" },
                        background: "#f3f4f9",
                        borderRadius: "15px",
                        boxShadow: "0 0 10px black",
                    }}
                >
                    {/* Title */}
                    <Box
                        sx={{
                            width: "100%",
                            height: "100px",
                            background: "#E68A00",
                            borderRadius: "15px 15px 0 0",
                            color: "white",
                            position: "relative",
                            zIndex: "2",
                        }}
                    >
                        <Typography
                            component="h1"
                            fontSize={20}
                            fontWeight={600}
                            marginBottom={2}
                            padding={5}
                        >
                            Información de la Reseración
                        </Typography>
                    </Box>

                    {/* Content */}
                    <Grid2
                        container
                        spacing={2}
                        padding={5}
                        sx={{ overflowY: "scroll", maxHeight: "70%" }}
                    >
                        {/* Detalles de vuelo */}
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <Typography
                                    component="h1"
                                    fontSize={15}
                                    fontWeight={600}
                                    marginBottom={1}
                                    sx={{ color: "#7d7d7d" }}
                                >
                                    Detalles de Vuelo
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Origen"
                                    name="Origen"
                                    radius="lg"
                                    value={selectedReservation.origen}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Destino"
                                    name="Destino"
                                    radius="lg"
                                    value={selectedReservation.destino}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Número de Pasajeros"
                                    name="numeroPasajeros"
                                    radius="lg"
                                    value={selectedReservation.numeroPasajeros.toString()}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Precio Estimado"
                                    name="precioEstimado"
                                    radius="lg"
                                    value={`${selectedReservation.precioTotal} USD`}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Input
                                    label="Fecha de Salida"
                                    name="fechaSalida"
                                    radius="lg"
                                    value={formatDateTime(selectedReservation.fechaSalida).date}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Input
                                    label="Fecha de Regreso"
                                    name="fechaRegreso"
                                    radius="lg"
                                    value={formatDateTime(selectedReservation.fechaRegreso).date}
                                    disabled
                                />
                            </Grid2>
                        </Grid2>

                        {/* Pasajero Principal */}
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <Typography
                                    component="h1"
                                    fontSize={15}
                                    fontWeight={600}
                                    marginBottom={1}
                                    sx={{ color: "#7d7d7d" }}
                                >
                                    Pasajero Principal
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Input
                                    label="Nombre Pasajero Principal"
                                    name="pasajeroPrincipal"
                                    radius="lg"
                                    value={selectedReservation.pasajeroPrincipal}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Input
                                    label="Correo Pasajero"
                                    name="correoPasajero"
                                    radius="lg"
                                    value={selectedReservation.correoPasajero}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Input
                                    label="Teléfono Pasajero"
                                    name="telefonoPasajero"
                                    radius="lg"
                                    value={selectedReservation.telefonoPasajero}
                                    disabled
                                />
                            </Grid2>
                        </Grid2>


                        {/* Otros pasajeros */}
                        <Grid2 container size={12} spacing={1}>
                            <Grid2 size={12}>
                                <Typography
                                    component="h1"
                                    fontSize={15}
                                    fontWeight={600}
                                    marginBottom={1}
                                    sx={{ color: "#7d7d7d" }}
                                >
                                    Pasajeros Adicionales
                                </Typography>
                            </Grid2>
                            {selectedReservation.notas.map((nota, index) => (
                                <Grid2 size={{ xs: 12, md: 6 }} key={index}>
                                    <Input
                                        label={`Nombre del pasajero ${index + 2}`}
                                        name={`pasajero${index + 1}`}
                                        radius="lg"
                                        value={nota}
                                        disabled
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Box>
            </Modal>
        </Box>
    );
}