import { Box, CircularProgress, Collapse, ListSubheader, IconButton, Grid2, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteDeal, GetDeals, GetPassengersByDeal, UpdateDeal } from "../../../services/AdminService";
import { Deal, defaultDeal } from "../../../types/types";
import DealsInfoModal from "./DealsInfoModal";
import DealCard from "./DealCard";
import AlertSnackbar from "../../general/AlertSnackbar";
import { toUTCString } from "../../../utils/utils";
import DealsEditModal from "./DealsEditModal";

const classifyDealsByYearAndMonth = (deals: any) => {
    const currentDate = new Date();
    return deals.reduce((acc: any, deal: any) => {
        const date = new Date(deal.fechaSalida);
        if (date >= currentDate) {
            const year = date.getFullYear();
            const month = date.toLocaleString('es-ES', { month: 'long' });
            if (!acc[year]) {
                acc[year] = {};
            }
            if (!acc[year][month]) {
                acc[year][month] = [];
            }
            acc[year][month].push(deal);
        }
        return acc;
    }, {});
};

export default function DealsList() {
    const currentYear = new Date().getFullYear();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const [open, setOpen] = useState<{ [key: string]: boolean }>({ [currentYear]: true });
    const [deals, setDeals] = useState<Deal[]>([]);

    const [selectedDeal, setSelectedDeal] = useState<Deal>(defaultDeal);

    const [passengers, setPassengers] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await GetDeals();
            setDeals(response);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedDeal(defaultDeal);
        setPassengers([]);
    };

    const handleToggle = (key: string) => {
        setOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    const getPassengers = async (id: number) => {
        try {
            const response = await GetPassengersByDeal(id);
            setPassengers(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteOffer = async (id: number) => {
        try {
            const response = await DeleteDeal(id);
            if (response.success) {
                setAlertMessage("Oferta eliminada correctamente");
                setAlertSeverity("success");
            } else {
                setAlertMessage("Ocurrió un error al eliminar la oferta");
                setAlertSeverity("error");
            }
        }
        catch (error) {
            setAlertMessage("Ocurrió un error al eliminar la oferta");
            setAlertSeverity("error");
        }
        finally {
            setOpenAlert(true);
            setOpenDialog(false);
            await fetchData();
        }
    }

    const editOffer = async () => {
        try {
            const data = {
                fechaSalida: toUTCString(selectedDeal.fechaSalida),
                disponibilidad: selectedDeal.disponibilidad,
                precio: selectedDeal.precio
            }

            const response = await UpdateDeal(selectedDeal.ofertaID, data)
            if (response.success) {
                setAlertMessage("Oferta editada correctamente");
                setAlertSeverity("success");
            } else {
                setAlertMessage("Ocurrió un error al editar la oferta");
                setAlertSeverity("error");
            }
        }
        catch (error) {
            setAlertMessage("Ocurrió un error al editar la oferta");
            setAlertSeverity("error");
        }
        finally {
            setOpenAlert(true);
            setOpenEditModal(false);
            await fetchData()
        }
    }

    const dealsByYearAndMonth = classifyDealsByYearAndMonth(deals);

    return (
        <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
            {loading ? (
                <CircularProgress sx={{ color: "#E68A00" }} />
            ) : (
                <Box sx={{ width: "100%" }}>
                    {Object.keys(dealsByYearAndMonth).map(year => (
                        <Box key={year} sx={{ marginBottom: "20px" }}>
                            <ListSubheader className="Lato" component="div" sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "3.2vh",
                                fontWeight: "bold",
                                color: '#F5F5F5',
                                bgcolor: '#E68A00',
                                borderRadius: "10px",
                                position: "relative",
                            }}>
                                {year}
                                <IconButton onClick={() => handleToggle(year)}>
                                    {open[year] ? <ExpandLessIcon sx={{ color: '#F5F5F5' }} /> : <ExpandMoreIcon sx={{ color: '#F5F5F5' }} />}
                                </IconButton>
                            </ListSubheader>
                            <Collapse in={open[year]} timeout="auto" unmountOnExit sx={{ mt: "10px" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", px: "3vw" }}>
                                    {Object.keys(dealsByYearAndMonth[year]).map(month => (
                                        <Box key={month} sx={{ marginBottom: "20px" }}>
                                            <ListSubheader component="div" sx={{ display: "flex", alignItems: "center", textTransform: "capitalize", position: "relative", borderRadius: "10px" }}>
                                                {month}
                                                <IconButton onClick={() => handleToggle(`${year}-${month}`)}>
                                                    {open[`${year}-${month}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </ListSubheader>
                                            <Collapse in={open[`${year}-${month}`]} timeout="auto" unmountOnExit>
                                                <Grid2 container spacing={2} mt={1}>
                                                    {dealsByYearAndMonth[year][month].map((deal: Deal, index: number) => (
                                                        <Grid2 container size={{ xs: 12, md: 6 }} key={index}>
                                                            <DealCard
                                                                deal={deal}
                                                                onView={async () => {
                                                                    setSelectedDeal(deal);
                                                                    await getPassengers(deal.ofertaID);
                                                                    setOpenModal(true);
                                                                }}
                                                                onEdit={() => {
                                                                    setSelectedDeal(deal)
                                                                    setOpenEditModal(true)
                                                                }}
                                                                onDelete={() => {
                                                                    setOpenDialog(true);
                                                                    setSelectedDeal(deal);
                                                                }}
                                                            />
                                                        </Grid2>
                                                    ))}
                                                </Grid2>
                                            </Collapse>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            )}
            <DealsInfoModal
                open={openModal}
                onClose={closeModal}
                deal={selectedDeal}
                passengers={passengers}
            />

            <DealsEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                selectedDeal={selectedDeal}
                setSelectedDeal={setSelectedDeal}
                onSave={editOffer}
            />

            <AlertSnackbar
                open={openAlert}
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setOpenAlert(false)}
            />

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Cancelar Oferta
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas cancelar esta oferta?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ borderRadius: "20px", color: "#FF4D4F" }}
                        onClick={() => setOpenDialog(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{ borderRadius: "20px", color: "#10E5A5" }}
                        onClick={async () => await deleteOffer(selectedDeal.ofertaID)}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}