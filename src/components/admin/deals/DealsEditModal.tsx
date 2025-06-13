import { Box, Modal, Typography, Button, Grid2 } from "@mui/material";
import { Input } from "@nextui-org/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Deal } from "../../../types/types";

interface DealsEditModalProps {
    open: boolean;
    onClose: () => void;
    selectedDeal: Deal;
    setSelectedDeal: (deal: Deal) => void;
    onSave: () => void;
}

const DealsEditModal: React.FC<DealsEditModalProps> = ({ open, onClose, selectedDeal, setSelectedDeal, onSave }) => {
    const isFormValid = !isNaN(selectedDeal.disponibilidad) && selectedDeal.disponibilidad > 0 &&
        !isNaN(selectedDeal.precio) && selectedDeal.precio > 0;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: '90%', md: '60%' },
                    height: { xs: '70%', md: '50%' },
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

                <Grid2 container spacing={2} padding={5}>
                    <Grid2 size={{ xs: 12, md: 12, lg: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DateTimePicker"]}>
                                <CustomDateTimePicker
                                    label="Salida"
                                    name="fechaSalida"
                                    value={dayjs(selectedDeal.fechaSalida)}
                                    onChange={(date) =>
                                        setSelectedDeal({
                                            ...selectedDeal,
                                            fechaSalida: date.format()
                                        })
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                        <Input
                            label="Disponibilidad"
                            type="number"
                            name="disponibilidad"
                            radius="lg"
                            min={1}
                            value={selectedDeal.disponibilidad.toString()}
                            onChange={(e) =>
                                setSelectedDeal({
                                    ...selectedDeal,
                                    disponibilidad: parseInt(e.target.value)
                                })
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                        <Input
                            label="Precio por Asiento"
                            type="number"
                            name="precio"
                            radius="lg"
                            min={1}
                            value={selectedDeal.precio.toString()}
                            onChange={(e) =>
                                setSelectedDeal({
                                    ...selectedDeal,
                                    precio: parseFloat(e.target.value)
                                })
                            }
                        />
                    </Grid2>
                </Grid2>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "20px",
                }}>
                    <Button onClick={() => onSave()} variant="outlined"
                        size="small"
                        disabled={!isFormValid}
                        sx={{
                            borderRadius: "20px",
                            color: "#10E5A5",
                            borderColor: "#10E5A5",
                            padding: '10px',
                            ":disabled": {
                                color: "#a8a8a8",
                                borderColor: "#a8a8a8",
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(22, 220, 163, 0.1)',
                                borderColor: '#10E5A5',
                                color: '#10E5A5'
                            }
                        }}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
};

export default DealsEditModal;
