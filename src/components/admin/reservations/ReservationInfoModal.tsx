import { Box, Typography, Modal, Grid2 } from "@mui/material";
import { Input } from "@nextui-org/react";
import { formatDateTimeMex } from "../../../utils/utils";
import { Reservation } from "../../../types/types";

interface ReservationInfoModalProps {
    open: boolean;
    onClose: () => void;
    reservation: Reservation;
}

const ReservationInfoModal: React.FC<ReservationInfoModalProps> = ({ open, onClose, reservation }) => {
    return (
        <Modal open={open} onClose={onClose}>
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
                    <Typography component="h1" fontSize={20} fontWeight={600} marginBottom={2} padding={5}>
                        Información de la Reservación
                    </Typography>
                </Box>

                {/* Content */}
                <Grid2 container spacing={2} padding={5} sx={{ overflowY: "scroll", maxHeight: "70%" }}>
                    {/* Detalles de vuelo */}
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: "#7d7d7d" }}>
                                Detalles de Vuelo
                            </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input label="Origen" name="Origen" radius="lg" value={reservation.origen} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input label="Destino" name="Destino" radius="lg" value={reservation.destino} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input label="Número de Pasajeros" name="numeroPasajeros" radius="lg" value={reservation.numeroPasajeros.toString()} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input label="Precio Total" name="precioTotal" radius="lg" value={`${reservation.precioTotal} USD`} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Input label="Fecha de Salida" name="fechaSalida" radius="lg" value={formatDateTimeMex(reservation.fechaSalida).date} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Input label="Fecha de Regreso" name="fechaRegreso" radius="lg" value={formatDateTimeMex(reservation.fechaRegreso).date} disabled />
                        </Grid2>
                    </Grid2>

                    {/* Pasajero Principal */}
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: "#7d7d7d" }}>
                                Pasajero Principal
                            </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Input label="Nombre Pasajero Principal" name="pasajeroPrincipal" radius="lg" value={reservation.pasajeroPrincipal} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Input label="Correo Pasajero" name="correoPasajero" radius="lg" value={reservation.correoPasajero} disabled />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Input label="Teléfono Pasajero" name="telefonoPasajero" radius="lg" value={reservation.telefonoPasajero} disabled />
                        </Grid2>
                    </Grid2>

                    {/* Otros pasajeros */}
                    <Grid2 container size={12} spacing={1}>
                        <Grid2 size={12}>
                            <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: "#7d7d7d" }}>
                                Pasajeros Adicionales
                            </Typography>
                        </Grid2>
                        {reservation.notas.map((nota, index) => (
                            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
                                <Input label={`Nombre del pasajero ${index + 2}`} name={`pasajero${index + 1}`} radius="lg" value={nota} disabled />
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
            </Box>
        </Modal>
    );
};

export default ReservationInfoModal;