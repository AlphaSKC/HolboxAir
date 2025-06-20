import { Box, Grid2, Typography, CircularProgress, Button, Modal, IconButton, Collapse, Stepper, Step, StepLabel, StepIconProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { ChangeStatusOfertaCreada, ChangeStatusReservacion, ConfirmFlightAdmin, CreateOferta, GetReservaciones } from "../../../services/AdminService";
import { Input } from "@nextui-org/react";
import { CheckmarkBadge01Icon, CircleArrowLeft02Icon, CircleArrowRight02Icon, TickDouble03Icon } from "hugeicons-react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { classifyReservations, toUTCString } from "../../../utils/utils";
import { defaultOferta, defaultReservation, Oferta, Reservation } from "../../../types/types";
import ReservationCard from "./ReservationCard";
import AlertSnackbar from "../../general/AlertSnackbar";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";
import ReservationInfoModal from "./ReservationInfoModal";
import ReservationConfirmModal from "./ReservationConfirmModal";

const CustomStepIcon = (props: StepIconProps & { icon: React.ReactNode }) => {
    const { active, completed, className, icon } = props;

    return (
        <Box
            className={className}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: active || completed ? "#E68A00" : "#ccc",
                borderRadius: "50%",
                fontSize: "2vh",
            }}
        >
            {completed ? (
                <CheckmarkBadge01Icon style={{ color: "#E68A00" }} />
            ) : (
                icon
            )}
        </Box>
    );
};

export default function ReservationList() {
    const [activeStep, setActiveStep] = useState<number>(0);

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedReservation, setSelectedReservation] =
        useState<Reservation>(defaultReservation);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [open, setOpen] = useState<{ [key: string]: boolean }>({
        "Por hacer": true,
        Completadas: false,
    });

    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState<string>("");

    const [oferta, setOferta] = useState<Oferta[]>([defaultOferta, defaultOferta]);
    const [openOfertas, setOpenOfertas] = useState<boolean>(false);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<string>("");

    const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

    const [confirmData, setConfirmData] = useState<{ codigo: string; montoPagado: number; }>({ codigo: "", montoPagado: 0 });

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
    };

    const changeStatusReservation = async (status: string) => {
        try {
            const response = await ChangeStatusReservacion(selectedReservation.reservacionID, { status: status });
            if (response.success) {
                setAlertSeverity("success");
                setAlertMessage("Vuelo " + status.toLowerCase() + " con éxito");
            }
            else {
                setAlertSeverity("error");
                setAlertMessage("Error al cambiar el estado del vuelo");
            }
        }
        catch (error) {
            setAlertSeverity("error");
            setAlertMessage("Error al cambiar el estado del vuelo: " + error);
        }
        finally {
            await fetchReservations();
            setAlertOpen(true);
            closeDialog();
        }
    }

    const closeDialog = () => setOpenDialog(false);

    const handleAlertClose = () => setAlertOpen(false);

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);;

    const closeModal = () => setOpenModal(false);

    const closeModalConfirm = () => {
        setOpenModalConfirm(false);
        setConfirmData({ codigo: "", montoPagado: 0 });
    };

    const closeOfertas = () => setOpenOfertas(false);

    const reservationsByStatus = classifyReservations(reservations);

    const handleToggle = (key: string) => {
        setOpen((prevState) => ({ ...prevState, [key]: !prevState[key] }));
    };

    const openOffersModal = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setOferta([
            { ...defaultOferta, origen: reservation.destino, destino: reservation.origen, fechaSalida: reservation.fechaSalida },
            { ...defaultOferta, origen: reservation.origen, destino: reservation.destino, fechaSalida: reservation.fechaRegreso }
        ]);
        setOpenOfertas(true);
    };

    const openCancelDialog = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setDialogContent("cancelar");
        setOpenDialog(true);
    };

    const openCompleteDialog = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setDialogContent("completar");
        setOpenDialog(true);
    };

    const handleCreateOffer = async (oferta: Oferta) => {
        const data = {
            origen: oferta.origen,
            destino: oferta.destino,
            fechaSalida: toUTCString(oferta.fechaSalida),
            disponibilidad: oferta.disponibilidad,
            precio: oferta.precio,
        }
        try {
            const response = await CreateOferta(data);
            if (response) {
                await ChangeStatusOfertaCreada(selectedReservation.reservacionID);
            }
        }
        catch (error) {
            setAlertSeverity("error");
            setAlertMessage("Error al crear la oferta: " + error);
        }
    }

    const handleCreateOffers = async () => {
        setLoading(true);
        try {
            await handleCreateOffer(oferta[0]);
            if (selectedReservation.fechaRegreso) {
                await handleCreateOffer(oferta[1]);
            }
            setAlertSeverity("success");
            setAlertMessage("Ofertas creadas con éxito");
        } catch (error) {
            setAlertSeverity("error");
            setAlertMessage("Error al crear las ofertas: " + error);
        } finally {
            await fetchReservations();
            setOpenOfertas(false);
            setAlertOpen(true);
            setLoading(false);
        }
    };

    const handleConfirm = async() => {
        try {
            const response = await ConfirmFlightAdmin(confirmData);
            if (response.success) {
                setAlertSeverity("success");
                setAlertMessage("Vuelo confirmado con éxito");
            }
            else {
                setAlertSeverity("error");
                setAlertMessage("Error al confirmar el vuelo");
            }
        }
        catch (error) {
            setAlertSeverity("error");
            setAlertMessage("Error al confirmar el vuelo: " + error);
        }
        finally {
            await fetchReservations();
            closeModalConfirm();
            setAlertOpen(true);
        }
    }


    const steps = [
        {
            label: 'Agregar vuelo 1', content: (
                <Grid2
                    container
                    spacing={2}
                    padding={5}
                >
                    <Grid2 container size={{ xs: 12, md: 5 }} spacing={1}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Hora del vuelo
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateTimePicker"]}>
                                    <CustomDateTimePicker
                                        label="Salida"
                                        name="fechaSalida"
                                        value={dayjs(oferta[0].fechaSalida)}
                                        onChange={(date) => setOferta((prev) => {
                                            const newOferta = [...prev];
                                            newOferta[0].fechaSalida = date.format();
                                            return newOferta;
                                        })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid2>
                    </Grid2>
                    <Grid2 container size={{ xs: 12, md: 3 }} spacing={1}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Precio del vuelo
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Input
                                label="Precio"
                                name="precio"
                                type="number"
                                radius="lg"
                                placeholder="1"
                                min={1}
                                value={oferta[0].precio.toString()}
                                onChange={(e) => setOferta((prev) => {
                                    const newOferta = [...prev];
                                    newOferta[0].precio = parseInt(e.target.value);
                                    return newOferta;
                                })}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container size={{ xs: 12, md: 4 }} spacing={1}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Disponibilidad
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Input
                                label="Disponibilidad"
                                name="disponibilidad"
                                radius="lg"
                                type="number"
                                placeholder="1"
                                min={1}
                                max={10}
                                value={oferta[0].disponibilidad.toString()}
                                onChange={(e) => setOferta((prev) => {
                                    const newOferta = [...prev];
                                    newOferta[0].disponibilidad = parseInt(e.target.value);
                                    return newOferta;
                                })}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
            )
        },
    ];

    if (selectedReservation.fechaRegreso) {
        steps.push({
            label: 'Agregar vuelo 2', content: (
                <Grid2
                    container
                    spacing={2}
                    padding={5}
                >
                    <Grid2 container size={{ xs: 12, md: 5 }} spacing={1}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Hora del vuelo
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateTimePicker"]}>
                                    <CustomDateTimePicker
                                        label="Salida"
                                        name="fechaSalida"
                                        value={dayjs(oferta[1].fechaSalida)}
                                        onChange={(date) => setOferta((prev) => {
                                            const newOferta = [...prev];
                                            newOferta[1].fechaSalida = date.format();
                                            return newOferta;
                                        })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid2>
                    </Grid2>
                    <Grid2 container size={{ xs: 12, md: 3 }} spacing={1}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Precio del vuelo
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Input
                                label="Precio"
                                name="precio"
                                type="number"
                                radius="lg"
                                placeholder="1"
                                min={1}
                                onChange={(e) => setOferta((prev) => {
                                    const newOferta = [...prev];
                                    newOferta[1].precio = parseInt(e.target.value);
                                    return newOferta;
                                })}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container size={{ xs: 12, md: 4 }} spacing={1}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Disponibilidad
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Input
                                label="Disponibilidad"
                                name="disponibilidad"
                                radius="lg"
                                type="number"
                                placeholder="1"
                                min={1}
                                max={10}
                                value={oferta[1].disponibilidad.toString()}
                                onChange={(e) => setOferta((prev) => {
                                    const newOferta = [...prev];
                                    newOferta[1].disponibilidad = parseInt(e.target.value);
                                    return newOferta;
                                })}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
            )
        });
    }

    return (
        <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
            {loading ? (
                <CircularProgress sx={{ color: "#E68A00" }} />
            ) : (
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", marginBottom: "20px" }}>
                        <Typography
                            className="Lato"
                            component="h1"
                            marginBottom={2}
                            sx={{ color: "#E68A00", fontSize: "3vh", fontWeight: "bold", }}
                        >
                            Reservaciones
                        </Typography>
                        <Button className="Lato" variant="outlined" onClick={() => setOpenModalConfirm(true)} size="medium" sx={{ borderRadius: "20px", color: "#2196F3", borderColor: "#2196F3", padding: "10px 20px", '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.1)', borderColor: '#2196F3', color: '#2196F3' } }}>
                            Confirmar vuelo
                            <TickDouble03Icon style={{ marginLeft: '5px' }} />
                        </Button>
                    </Box>
                    {Object.keys(reservationsByStatus).map((status) => (
                        <Box key={status} sx={{ marginBottom: "20px" }}>
                            <Typography
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
                                    padding: "10px",
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
                            </Typography>
                            <Collapse
                                in={open[status]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ mt: "10px", width: "100%" }}
                            >
                                <Grid2 container spacing={2} sx={{ mt: "10px", width: "100%" }}>
                                    {reservationsByStatus[status].map(
                                        (reservation: Reservation) => (
                                            <Grid2
                                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                                key={reservation.reservacionID}
                                            >
                                                <ReservationCard
                                                    reservation={reservation}
                                                    onView={() => {
                                                        setSelectedReservation(reservation);
                                                        setOpenModal(true);
                                                    }}
                                                    onCreateOffer={() => openOffersModal(reservation)}
                                                    onCancel={() => openCancelDialog(reservation)}
                                                    onCompleted={() => openCompleteDialog(reservation)}
                                                />
                                            </Grid2>
                                        )
                                    )}
                                </Grid2>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            )}
            {/* Modal para ver la información de la reservación */}
            <ReservationInfoModal
                open={openModal}
                onClose={closeModal}
                reservation={selectedReservation}
            />

            {/* Modal para confirmar vuelo */}
            <ReservationConfirmModal
                open={openModalConfirm}
                setConfirmData={setConfirmData}
                confirmData={confirmData}
                onClose={closeModalConfirm}
                onConfirm={handleConfirm}
            />

            {/* Modal para agregar a ofertas */}
            <Modal open={openOfertas} onClose={closeOfertas}>
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
                        display: "flex",
                        flexDirection: "column",
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
                            Agregar a ofertas
                        </Typography>
                    </Box>
                    {/* Stepper */}
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
                            width: "100%",
                            mt: 3,
                        }}
                    >
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel slots={{ stepIcon: (props) => <CustomStepIcon {...props} icon={index + 1} /> }}>
                                    {step.label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {/* Step Content */}
                    <Box sx={{ overflowY: "scroll" }}>
                        {steps[activeStep].content}
                    </Box>
                    {/* Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            padding: "20px",
                            borderTop: "1px solid #ccc",
                        }}
                    >
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, color: "#E68A00" }}
                        >
                            <CircleArrowLeft02Icon />
                        </Button>
                        {activeStep === steps.length - 1 && (
                            <Button
                                variant="contained"
                                sx={{ ml: 1, color: "white", bgcolor: "#E68A00" }}
                                onClick={handleCreateOffers}
                                disabled={loading}
                            >
                                Subir
                            </Button>
                        )}
                        <Button
                            disabled={activeStep === steps.length - 1}
                            onClick={handleNext}
                            sx={{ ml: 1, color: "#E68A00" }}
                        >
                            <CircleArrowRight02Icon />
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar */}
            <AlertSnackbar
                open={alertOpen}
                severity={alertSeverity}
                message={alertMessage}
                onClose={handleAlertClose}
            />

            {/*Dialog */}
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>
                    {dialogContent === "cancelar" ? "Cancelar" : "Completar"} Vuelo
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas {dialogContent} este vuelo?
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
                            dialogContent === "cancelar" ? changeStatusReservation("Cancelado") : changeStatusReservation("Completado");
                        }}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}