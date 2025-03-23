import { Box, Grid2, Modal, Typography } from "@mui/material";
import { Deal } from "../../../types/types";
import { Input } from "@nextui-org/react";
import { formatDateTimeMex } from "../../../utils/utils";

interface DealsInfoModalProps {
    open: boolean;
    onClose: () => void;
    deal: Deal;
    passengers: any[];
}

const DealsInfoModal: React.FC<DealsInfoModalProps> = ({ open, onClose, deal, passengers }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: '90%', md: '70%' },
                    height: "70%",
                    background: "#f3f4f9",
                    borderRadius: "15px",
                    boxShadow: "0 0 10px black",
                }}
            >
                {/* TITLE */}
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
                        Información de la Oferta
                    </Typography>
                </Box>

                {/* CONTENT */}
                <Grid2
                    container
                    spacing={2}
                    padding={5}
                    sx={{ overflowY: "scroll", maxHeight: "70%" }}
                >
                    {/* DETALLES DEL VUELO */}
                    <Grid2 container spacing={1} width={'100%'}>
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
                                value={deal.origen}
                                disabled
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input
                                label="Destino"
                                name="destino"
                                radius="lg"
                                value={deal.destino}
                                disabled
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input
                                label="Precio por Asiento"
                                name="precio"
                                radius="lg"
                                value={deal.precio.toString()}
                                disabled
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <Input
                                label="Disponibilidad"
                                name="disponibilidad"
                                radius="lg"
                                value={deal.disponibilidad.toString()}
                                disabled
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Input
                                label="Fecha de Salida"
                                name="fechaSalida"
                                radius="lg"
                                value={`${formatDateTimeMex(deal.fechaSalida).date} ${formatDateTimeMex(deal.fechaSalida).time
                                    }`}
                                disabled
                            />
                        </Grid2>
                    </Grid2>

                    {/* PASAJEROS */}
                    <Grid2 container spacing={1} width={'100%'}>
                        <Grid2 size={12}>
                            <Typography
                                component="h1"
                                fontSize={15}
                                fontWeight={600}
                                marginBottom={1}
                                sx={{ color: "#7d7d7d" }}
                            >
                                Pasajeros Registrados
                            </Typography>
                        </Grid2>

                        {(passengers?.length ?? 0) > 0 ? (
                            passengers
                                .flatMap((pax) => [pax.pasajeroPrincipal, ...(pax.pasajeros ?? [])])
                                .map((nombre, index) => (
                                    <Grid2 size={12} key={index}>
                                        <Input
                                            label={`Pasajero ${index + 1}`}
                                            name={`pasajero${index + 1}`}
                                            radius="lg"
                                            value={nombre}
                                            disabled
                                        />
                                    </Grid2>
                                ))
                        ) : (
                            <Grid2 size={12}>
                                <Typography fontSize={14} sx={{ color: "#999" }}>
                                    No hay pasajeros registrados.
                                </Typography>
                            </Grid2>
                        )}
                    </Grid2>
                </Grid2>
            </Box>
        </Modal>
    )
}

export default DealsInfoModal;