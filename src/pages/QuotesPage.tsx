import { Box, Grid2, List, ListItem, ListSubheader, Collapse, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetCotizaciones } from "../services/UserService";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [open, setOpen] = useState<{ [key: string]: boolean }>({ "Pendiente": true, "Aprobada": true, "Cancelada": true });

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

    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "green",
            padding: {
                xs: "100px 40px 100px 100px",
                sm: "100px 40px 100px 100px",
                md: "100px 40px 100px 100px",
                lg: "100px",
            },
            width: "100%",
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
                                        <Grid2 size={3} key={quote.cotizacionID} sx={{bgcolor:'blue'}}>
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
        </Box>
    );
}