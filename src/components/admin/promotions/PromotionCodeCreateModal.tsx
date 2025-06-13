import { Box, Modal, Typography, Button, Grid2 } from "@mui/material";
import { Input } from "@nextui-org/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { PromotionCode } from "../../../types/types";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";

interface PromotionCodeCreateModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (promotionCode: Partial<PromotionCode>) => void;
}

export default function PromotionCodeCreateModal({ open, onClose, onSave }: PromotionCodeCreateModalProps) {
    const [newPromotionCode, setNewPromotionCode] = useState<Partial<PromotionCode>>({
        codigo: "",
        descuentoUSD: 0,
        fechaInicio: dayjs().format(),
        fechaFin: dayjs().add(1, 'month').format(),
        usosTotales: 1
    });

    const isFormValid = 
        newPromotionCode.codigo && 
        newPromotionCode.codigo.length > 0 &&
        !isNaN(Number(newPromotionCode.descuentoUSD)) && 
        Number(newPromotionCode.descuentoUSD) > 0 &&
        !isNaN(Number(newPromotionCode.usosTotales)) && 
        Number(newPromotionCode.usosTotales) > 0;

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
                    height: { xs: '80%', md: '70%' },
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
                        Crear Código de Descuento
                    </Typography>
                </Box>

                <Grid2 container spacing={2} padding={5}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            label="Código"
                            type="text"
                            name="codigo"
                            radius="lg"
                            value={newPromotionCode.codigo}
                            onChange={(e) =>
                                setNewPromotionCode({
                                    ...newPromotionCode,
                                    codigo: e.target.value.toUpperCase()
                                })
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            label="Descuento (USD)"
                            type="number"
                            name="descuentoUSD"
                            radius="lg"
                            min={1}
                            value={newPromotionCode.descuentoUSD?.toString()}
                            onChange={(e) =>
                                setNewPromotionCode({
                                    ...newPromotionCode,
                                    descuentoUSD: parseFloat(e.target.value)
                                })
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DateTimePicker"]}>
                                <CustomDateTimePicker
                                    label="Fecha de Inicio"
                                    value={dayjs(newPromotionCode.fechaInicio)}
                                    onChange={(date) =>
                                        setNewPromotionCode({
                                            ...newPromotionCode,
                                            fechaInicio: date?.format() || dayjs().format()
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
                                    label="Fecha de Fin"
                                    value={dayjs(newPromotionCode.fechaFin)}
                                    onChange={(date) =>
                                        setNewPromotionCode({
                                            ...newPromotionCode,
                                            fechaFin: date?.format() || dayjs().add(1, 'month').format()
                                        })
                                    }
                                    minDate={dayjs(newPromotionCode.fechaInicio)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <Input
                            label="Usos Totales"
                            type="number"
                            name="usosTotales"
                            radius="lg"
                            min={1}
                            value={newPromotionCode.usosTotales?.toString()}
                            onChange={(e) =>
                                setNewPromotionCode({
                                    ...newPromotionCode,
                                    usosTotales: parseInt(e.target.value)
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
                    <Button 
                        onClick={() => onSave(newPromotionCode)} 
                        variant="outlined"
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
                            }
                        }}
                    >
                        Crear Código
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
} 