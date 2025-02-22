import { Box, Grid2, List, ListItem, ListSubheader, Collapse, IconButton, Typography, Modal, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GetCotizaciones } from "../services/UserService";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Input } from "@nextui-org/react";

interface Quote {
    cotizacionID: number;
    pasajeroPrincipal: string;
    correoPasajero: string;
    telefonoPasajero: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso: string;
    numeroPasajeros: number;
    precioEstimado: number;
    estado: string;
    codigoCotizacion: string;
    fechaCreacion: string;
    notas: string[];
}

const defaulQuote: Quote = {
    cotizacionID: 0,
    pasajeroPrincipal: "",
    correoPasajero: "",
    telefonoPasajero: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaRegreso: "",
    numeroPasajeros: 0,
    precioEstimado: 0,
    estado: "",
    codigoCotizacion: "",
    fechaCreacion: "",
    notas: [],
}

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

const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return { date: "N/A", time: "" };
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return {
        date: date.toLocaleDateString('en-US', optionsDate),
        time: date.toLocaleTimeString('en-US', optionsTime)
    };
};

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<Quote>(defaulQuote);
    const [open, setOpen] = useState<{ [key: string]: boolean }>({ "Pendiente": true, "Aprobada": true, "Cancelada": true });
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [secondModalOpen, setSecondModalOpen] = useState<boolean>(false);

    const fetchQuotes = async () => {
        try {
            const response = await GetCotizaciones();
            setQuotes(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const quotesByStatus = classifyQuotesByStatus(quotes);

    const handleToggle = (key: string) => {
        setOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    const closeModal = () => setModalOpen(false);
    const openSecondModal = () => {
        setModalOpen(false);
        setSecondModalOpen(true);
    };

    const closeSecondModal = () => setSecondModalOpen(false);

    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            bgcolor: "#F3F4F9",
            padding: {
                xs: "100px 40px 100px 100px",
                sm: "100px 40px 100px 100px",
                md: "100px 40px 100px 100px",
                lg: "100px",
            },
            width: "100%",
            boxSizing: "border-box",
        }}>
            <Box sx={{ width: "100%" }}>
                {Object.keys(quotesByStatus).map(status => (
                    <Box key={status} sx={{ marginBottom: "20px", width: "100%" }}>
                        <ListSubheader component="div" sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "3.2vh",
                            fontWeight: "bold",
                            color: '#F5F5F5',
                            bgcolor: '#E68A00',
                            borderRadius: "10px",
                            position: "relative",
                        }}>
                            {status}
                            <IconButton onClick={() => handleToggle(status)}>
                                {open[status] ? <ExpandLessIcon sx={{ color: '#F5F5F5' }} /> : <ExpandMoreIcon sx={{ color: '#F5F5F5' }} />}
                            </IconButton>
                        </ListSubheader>
                        <Collapse in={open[status]} timeout="auto" unmountOnExit sx={{ mt: "10px", width: "100%" }}>
                            <List component="div" disablePadding sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px", width: "100%" }}>
                                <Grid2 container spacing={2}>
                                    {quotesByStatus[status].map((quote: Quote) => (
                                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={quote.cotizacionID}>
                                            <ListItem sx={{ width: "100%" }}>
                                                {/* Este se reemplaza por una card más bonita */}
                                                <Box sx={{
                                                    width: "100%",
                                                    bgcolor: "white",
                                                    padding: "20px",
                                                    borderRadius: "10px"
                                                }}>
                                                    <Typography variant="h6">{quote.pasajeroPrincipal}</Typography>
                                                    <Typography variant="body2">{quote.correoPasajero}</Typography>
                                                    <Typography variant="body2">{quote.telefonoPasajero}</Typography>
                                                    <Typography variant="body2">{quote.origen}</Typography>
                                                    <Typography variant="body2">{quote.destino}</Typography>
                                                    <Typography variant="body2">{quote.fechaSalida}</Typography>
                                                    <Typography variant="body2">{quote.fechaRegreso}</Typography>
                                                    <Typography variant="body2">{quote.numeroPasajeros}</Typography>
                                                    <Typography variant="body2">{quote.precioEstimado}</Typography>
                                                    <Typography variant="body2">{quote.estado}</Typography>
                                                    <Typography variant="body2">{quote.codigoCotizacion}</Typography>
                                                    <Typography variant="body2">{quote.fechaCreacion}</Typography>
                                                    <Typography variant="body2">{quote.notas.join(", ")}</Typography>
                                                    <Button onClick={() => {
                                                        setSelectedQuote(quote);
                                                        setModalOpen(true);
                                                    }}>
                                                        Modal
                                                    </Button>
                                                </Box>
                                            </ListItem>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </Box>
            <Modal open={modalOpen} onClose={closeModal}>
                <Box
                    component="form"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
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
                        <Grid2 container spacing={1}>
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
                                    value={`${formatDateTime(selectedQuote.fechaSalida).date} ${formatDateTime(selectedQuote.fechaSalida).time}`}
                                    disabled
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Input
                                    label="Fecha y Hora de Regreso"
                                    name="fechaRegreso"
                                    radius="lg"
                                    value={`${formatDateTime(selectedQuote.fechaRegreso).date} ${formatDateTime(selectedQuote.fechaRegreso).time}`}
                                    disabled
                                />
                            </Grid2>
                        </Grid2>
                        {/* Información del Pasajero */}
                        <Grid2 container size={12} spacing={1} >
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
                        <Button onClick={openSecondModal}>
                            Abrir Segundo Modal
                        </Button>
                    </Grid2>
                </Box>
            </Modal>

            <Modal open={secondModalOpen} onClose={closeSecondModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        background: "#fff",
                        borderRadius: "15px",
                        boxShadow: "0 0 10px black",
                        padding: "20px",
                    }}
                >
                    <Typography variant="h6">Segundo Modal</Typography>
                    <Typography variant="body1">Contenido del segundo modal.</Typography>
                    <Button onClick={closeSecondModal}>Cerrar</Button>
                </Box>
            </Modal>
        </Box>
    );
}