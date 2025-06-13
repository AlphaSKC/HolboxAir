import {
    Box,
    Grid2,
    List,
    ListItem,
    ListSubheader,
    Collapse,
    IconButton,
    Typography,
    Modal,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide,
    SlideProps,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Image,
    CardFooter,
} from "@nextui-org/react";
import {
    CancelCircleIcon,
    CheckmarkCircle03Icon,
    MessageEdit01Icon,
    ViewIcon,
} from "hugeicons-react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { AccountCircle } from "@mui/icons-material";
import {
    ChangeDateCotizacion,
    ChangeStatusCotizacion,
    CreateReservacion,
    GetCotizaciones,
    SendEmailChangeDate,
    SendEmailConfirmationQuote,
} from "../../../services/AdminService";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { formatDateTimeMex, toUTCString } from "../../../utils/utils";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";
import { Quote, defaulQuote } from "../../../types/types";

import DefaultFlight from "../../../assets/img/others/DefaultFlights.jpg";

const classifyQuotesByStatus = (quotes: Quote[]) => {
    return quotes.reduce((acc: any, quote: Quote) => {
        const status = quote.estado;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(quote);
        return acc;
    }, {});
};

export default function QuoteList() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<Quote>(defaulQuote);

    const [fechaSalidaAnterior, setFechaSalidaAnterior] = useState<string>("");
    const [fechaRegresoAnterior, setFechaRegresoAnterior] = useState<string>("");

    const [open, setOpen] = useState<{ [key: string]: boolean }>({
        Pendiente: true,
        Aprobada: false,
        Cancelada: false,
    });
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [secondModalOpen, setSecondModalOpen] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<string>("");
    const [changeStatus, setChangeStatus] = useState<string>("");

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
        "success"
    );

    const [loading, setLoading] = useState<boolean>(true);

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="left" />;
    }

    const fetchQuotes = async () => {
        try {
            const response = await GetCotizaciones();
            setQuotes(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const quotesByStatus = classifyQuotesByStatus(quotes);

    const handleToggle = (key: string) => {
        setOpen((prevState) => ({ ...prevState, [key]: !prevState[key] }));
    };

    const closeModal = () => setModalOpen(false);
    const openSecondModal = () => {
        setModalOpen(false);
        setSecondModalOpen(true);
    };

    const changeStatusQuote = async (id: number, status: any) => {
        try {
            const data = { status: status };
            const response = await ChangeStatusCotizacion(id, data);
            if (response.success && status === "Aceptada") {
                const emailData = {
                    correoPasajero: selectedQuote.correoPasajero,
                    origen: selectedQuote.origen,
                    destino: selectedQuote.destino,
                    fechaSalida: toUTCString(selectedQuote.fechaSalida),
                    fechaRegreso: selectedQuote.fechaRegreso
                        ? toUTCString(selectedQuote.fechaRegreso)
                        : null,
                    codigo: selectedQuote.codigoCotizacion,
                }
                await SendEmailConfirmationQuote(emailData);
                const fechaReserva = toUTCString(new Date().toISOString());
                const reservation = {
                    cotizacionID: id,
                    pasajeroPrincipal: selectedQuote.pasajeroPrincipal,
                    fechaReserva: fechaReserva,
                    estado: "Disponible",
                };
                await CreateReservacion(reservation);
            }
            setAlertMessage(response.message);
            setAlertSeverity(response.success ? "success" : "error");
        } catch (error) {
            setAlertMessage(
                "Error al cambiar el estado de la cotización. Inténtalo de nuevo."
            );
            setAlertSeverity("error");
        } finally {
            setAlertOpen(true);
            await fetchQuotes();
            closeAll();
        }
    };

    const changeDateQuote = async () => {
        setLoading(true);
        const id = selectedQuote.cotizacionID;
        const data = {
            fechaSalida: toUTCString(selectedQuote.fechaSalida),
            fechaRegreso: selectedQuote.fechaRegreso
                ? toUTCString(selectedQuote.fechaRegreso)
                : null,
        };
        try {
            const response = await ChangeDateCotizacion(id, data);
            if (response.success) {
                const emailData = {
                    correoPasajero: selectedQuote.correoPasajero,
                    origen: selectedQuote.origen,
                    destino: selectedQuote.destino,
                    fechaSalidaAntigua: toUTCString(fechaSalidaAnterior),
                    fechaSalidaNueva: toUTCString(selectedQuote.fechaSalida),
                    fechaRegresoAntigua: fechaRegresoAnterior
                        ? toUTCString(fechaRegresoAnterior)
                        : null,
                    fechaRegresoNueva: selectedQuote.fechaRegreso
                        ? toUTCString(selectedQuote.fechaRegreso)
                        : null,
                    codigo: selectedQuote.codigoCotizacion,
                };
                const reservation = {
                    cotizacionID: id,
                    pasajeroPrincipal: selectedQuote.pasajeroPrincipal,
                    fechaReserva: toUTCString(new Date().toISOString()),
                    estado: "Revision",
                }
                await CreateReservacion(reservation);
                await SendEmailChangeDate(emailData);
                setAlertMessage(response.message);
                setAlertSeverity("success");
            }
        } catch (error) {
            setAlertMessage(
                "Error al cambiar la fecha de la cotización. Inténtalo de nuevo."
            );
            setAlertSeverity("error");
        } finally {
            setLoading(false);
            await fetchQuotes();
            setAlertOpen(true);
            closeAll();
        }
    };

    const closeSecondModal = () => setSecondModalOpen(false);

    const closeDialog = () => setOpenDialog(false);

    const closeAll = () => {
        setModalOpen(false);
        setSecondModalOpen(false);
        setOpenDialog(false);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
            {loading ? (
                <CircularProgress sx={{ color: "#E68A00" }} />
            ) : (
                <Box sx={{ width: "100%" }}>
                    {Object.keys(quotesByStatus).map((status) => (
                        <Box key={status} sx={{ marginBottom: "20px" }}>
                            <ListSubheader
                                component="div"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "3.2vh",
                                    fontWeight: "bold",
                                    color: "#F5F5F5",
                                    bgcolor: "#E68A00",
                                    borderRadius: "10px",
                                    position: "relative",
                                }}
                            >
                                {status}
                                <IconButton onClick={() => handleToggle(status)}>
                                    {open[status] ? (
                                        <ExpandLessIcon sx={{ color: "#F5F5F5" }} />
                                    ) : (
                                        <ExpandMoreIcon sx={{ color: "#F5F5F5" }} />
                                    )}
                                </IconButton>
                            </ListSubheader>
                            <Collapse
                                in={open[status]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ mt: "10px", width: "100%" }}
                            >
                                <List
                                    component="div"
                                    disablePadding
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        gap: "20px",
                                        width: "100%",
                                    }}
                                >
                                    <Grid2 container spacing={2}>
                                        {quotesByStatus[status].map((quote: Quote) => (
                                            <Grid2
                                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                                key={quote.cotizacionID}
                                            >
                                                <ListItem
                                                    sx={{
                                                        width: "100%",
                                                        minWidth: "22vw",
                                                        justifyContent: "center",
                                                        height: "100%",
                                                    }}
                                                >
                                                    <Card className="py-4" style={{ height: "100%" }}>
                                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "2.5vh",
                                                                    fontWeight: "bold",
                                                                    color: "#2E2E2E",
                                                                }}
                                                            >
                                                                {quote.pasajeroPrincipal}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "2.5vh",
                                                                    fontWeight: "bold",
                                                                    color: "#E68A00",
                                                                }}
                                                            >
                                                                {quote.codigoCotizacion}
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
                                                                    {quote.origen} - {quote.destino}
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    gap: "10px",
                                                                }}
                                                            >
                                                                <FlightTakeoffIcon sx={{ color: "#E68A00" }} />
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: "1.8vh",
                                                                        fontWeight: "bold",
                                                                        color: "#7D7D7D",
                                                                    }}
                                                                >
                                                                    {formatDateTimeMex(quote.fechaSalida).date} -{" "}
                                                                    {formatDateTimeMex(quote.fechaSalida).time}
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    gap: "10px",
                                                                }}
                                                            >
                                                                <FlightLandIcon sx={{ color: "#E68A00" }} />
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: "1.8vh",
                                                                        fontWeight: "bold",
                                                                        color: "#7D7D7D",
                                                                    }}
                                                                >
                                                                    {formatDateTimeMex(quote.fechaRegreso).date}
                                                                    {formatDateTimeMex(quote.fechaRegreso).date !==
                                                                        "N/A" &&
                                                                        ` - ${formatDateTimeMex(quote.fechaRegreso).time
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
                                                                <AccountCircle sx={{ color: "#E68A00" }} />
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: "1.8vh",
                                                                        fontWeight: "bold",
                                                                        color: "#7D7D7D",
                                                                    }}
                                                                >
                                                                    {quote.numeroPasajeros}{" "}
                                                                    {quote.numeroPasajeros > 1
                                                                        ? "Pasajeros"
                                                                        : "Pasajero"}
                                                                </Typography>
                                                            </Box>
                                                        </CardHeader>
                                                        <CardBody className="overflow-visible py-2">
                                                            <Image
                                                                alt="Card background"
                                                                className="object-cover rounded-xl"
                                                                src={DefaultFlight}
                                                                width={"100%"}
                                                            />
                                                        </CardBody>
                                                        <CardFooter
                                                            className={`text-small ${quote.estado === "Pendiente"
                                                                ? "justify-between"
                                                                : "justify-center"
                                                                }`}
                                                        >
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{
                                                                    borderRadius: "20px",
                                                                    color: "#a8a8a8",
                                                                    borderColor: "#a8a8a8",
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(168, 168, 168, 0.1)',
                                                                        borderColor: '#a8a8a8',
                                                                        color: '#a8a8a8'
                                                                    }
                                                                }}
                                                                onClick={() => {
                                                                    setSelectedQuote(quote);
                                                                    setModalOpen(true);
                                                                }}
                                                            >
                                                                <ViewIcon />
                                                            </Button>
                                                            {quote.estado === "Pendiente" && (
                                                                <>
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "20px",
                                                                            color: "#FF4D4F",
                                                                            borderColor: "#FF4D4F",
                                                                            '&:hover': {
                                                                                backgroundColor: 'rgba(255, 77, 79, 0.1)',
                                                                                borderColor: '#FF4D4F',
                                                                                color: '#FF4D4F'
                                                                            }
                                                                        }}
                                                                        onClick={() => {
                                                                            setSelectedQuote(quote);
                                                                            setDialogContent("cancelar");
                                                                            setChangeStatus("Cancelada");
                                                                            setOpenDialog(true);
                                                                        }}
                                                                    >
                                                                        <CancelCircleIcon />
                                                                    </Button>
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        sx={{
                                                                            borderRadius: "20px",
                                                                            color: "#10E5A5",
                                                                            borderColor: "#10E5A5",
                                                                            '&:hover': {
                                                                                backgroundColor: 'rgba(22, 220, 163, 0.1)',
                                                                                borderColor: '#10E5A5',
                                                                                color: '#10E5A5'
                                                                            }
                                                                        }}
                                                                        onClick={() => {
                                                                            setSelectedQuote(quote);
                                                                            setDialogContent("aprobar");
                                                                            setChangeStatus("Aceptada");
                                                                            setOpenDialog(true);
                                                                        }}
                                                                    >
                                                                        <CheckmarkCircle03Icon />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </CardFooter>
                                                    </Card>
                                                </ListItem>
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            )}
            {/* Modal para ver la informacion completa */}
            <Modal open={modalOpen} onClose={closeModal}>
                <Box
                    component="form"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        height: { xs: "70%", md: "90%" },
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
                            Información de la Cotización
                        </Typography>
                    </Box>

                    {/* Content */}
                    <Grid2
                        container
                        spacing={2}
                        padding={5}
                        sx={{ overflowY: "scroll", maxHeight: "70%" }}
                    >
                        {/* Detalles del vuelo */}
                        <Grid2 container spacing={1} justifyContent={"center"}>
                            <Grid2 size={12}>
                                <Typography
                                    component="h1"
                                    fontSize={15}
                                    fontWeight={600}
                                    marginBottom={1}
                                    sx={{ color: "#7d7d7d" }}
                                >
                                    Detalles del Vuelo
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Origen"
                                    name="origen"
                                    radius="lg"
                                    value={selectedQuote.origen}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Destino"
                                    name="destino"
                                    radius="lg"
                                    value={selectedQuote.destino}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Número de Pasajeros"
                                    name="numeroPasajeros"
                                    radius="lg"
                                    value={selectedQuote.numeroPasajeros.toString()}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <Input
                                    label="Precio Estimado"
                                    name="precioEstimado"
                                    radius="lg"
                                    value={selectedQuote.precioEstimado.toString()}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Input
                                    label="Fecha y Hora de Salida"
                                    name="fechaSalida"
                                    radius="lg"
                                    value={`${formatDateTimeMex(selectedQuote.fechaSalida).date} ${formatDateTimeMex(selectedQuote.fechaSalida).time
                                        }`}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Input
                                    label="Fecha y Hora de Regreso"
                                    name="fechaRegreso"
                                    radius="lg"
                                    value={`${formatDateTimeMex(selectedQuote.fechaRegreso).date} ${formatDateTimeMex(selectedQuote.fechaRegreso).time
                                        }`}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 3 }}>
                                <Input
                                    label="Código de Cotización"
                                    name="codigoCotizacion"
                                    radius="lg"
                                    value={selectedQuote.codigoCotizacion}
                                    disabled
                                />
                            </Grid2>
                        </Grid2>
                        {/* Información del Pasajero */}
                        <Grid2 container size={12} spacing={1}>
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
                                    label="Nombre del Pasajero"
                                    name="pasajeroPrincipal"
                                    radius="lg"
                                    value={selectedQuote.pasajeroPrincipal}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Input
                                    label="Correo Electrónico"
                                    name="correoPasajero"
                                    radius="lg"
                                    value={selectedQuote.correoPasajero}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Input
                                    label="Número de Teléfono"
                                    name="telefonoPasajero"
                                    radius="lg"
                                    value={selectedQuote.telefonoPasajero}
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
                            {selectedQuote.notas.map((nota, index) => (
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

                    {/* Buttons */}
                    {selectedQuote.estado === "Pendiente" && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "20px",
                                padding: "20px",
                            }}
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: "20px",
                                    color: "#2196F3",
                                    borderColor: "#2196F3",
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                        borderColor: '#2196F3',
                                        color: '#2196F3'
                                    }
                                }}
                                onClick={() => {
                                    setFechaSalidaAnterior(selectedQuote.fechaSalida);
                                    setFechaRegresoAnterior(selectedQuote.fechaRegreso);
                                    openSecondModal();
                                }}
                            >
                                <MessageEdit01Icon />
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: "20px",
                                    color: "#FF4D4F",
                                    borderColor: "#FF4D4F",
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 77, 79, 0.1)',
                                        borderColor: '#FF4D4F',
                                        color: '#FF4D4F'
                                    }
                                }}
                                onClick={() => {
                                    setDialogContent("cancelar");
                                    setChangeStatus("Cancelada");
                                    setOpenDialog(true);
                                }}
                            >
                                <CancelCircleIcon />
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: "20px",
                                    color: "#10E5A5",
                                    borderColor: "#10E5A5",
                                    '&:hover': {
                                        backgroundColor: 'rgba(22, 220, 163, 0.1)',
                                        borderColor: '#10E5A5',
                                        color: '#10E5A5'
                                    }
                                }}
                                onClick={() => {
                                    setDialogContent("aprobar");
                                    setChangeStatus("Aceptada");
                                    setOpenDialog(true);
                                }}
                            >
                                <CheckmarkCircle03Icon />
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>

            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>
                    {dialogContent === "aprobar" ? "Aprobar" : "Cancelar"} Cotización
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas {dialogContent} esta cotización?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ borderRadius: "20px", color: "#FF4D4F" }}
                        onClick={closeDialog}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{ borderRadius: "20px", color: "#10E5A5" }}
                        onClick={() => {
                            changeStatusQuote(selectedQuote.cotizacionID, changeStatus);
                            closeAll();
                        }}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal para cambiar las fechas de la cotización */}
            <Modal open={secondModalOpen} onClose={closeSecondModal}>
                <Box
                    component="form"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", sm: "80%", md: "70%", lg: "55%" },
                        height: "70%",
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
                            Cambio de Fechas de Vuelo
                        </Typography>
                    </Box>
                    <Grid2 container spacing={2} padding={5}>
                        <Grid2 container spacing={1}>
                            <Grid2 size={12}>
                                <Typography
                                    component="h1"
                                    fontSize={15}
                                    fontWeight={600}
                                    marginBottom={1}
                                    sx={{ color: "#7d7d7d" }}
                                >
                                    Fechas de Vuelo
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DateTimePicker"]}>
                                        <CustomDateTimePicker
                                            label="Salida"
                                            name="fechaSalida"
                                            value={dayjs(selectedQuote.fechaSalida)}
                                            onChange={(date) =>
                                                setSelectedQuote({
                                                    ...selectedQuote,
                                                    fechaSalida: date.format(),
                                                })
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DateTimePicker"]}>
                                        <CustomDateTimePicker
                                            label="Regreso"
                                            name="fechaRegreso"
                                            value={
                                                selectedQuote.fechaRegreso
                                                    ? dayjs(selectedQuote.fechaRegreso)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                setSelectedQuote({
                                                    ...selectedQuote,
                                                    fechaRegreso: date.format(),
                                                })
                                            }
                                            disabled={!selectedQuote.fechaRegreso}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            padding: "20px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            style={{
                                borderRadius: "20px",
                                color: "#FF4D4F",
                                borderColor: "#FF4D4F",
                            }}
                            onClick={closeSecondModal}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            style={{
                                borderRadius: "20px",
                                color: "#10E5A5",
                                borderColor: "#10E5A5",
                            }}
                            onClick={changeDateQuote}
                            disabled={loading}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertSeverity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
