import { Box, Modal, Typography, Button, Grid2 } from "@mui/material";
import { Input } from "@nextui-org/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PromotionCode } from "../../../types/types";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";
import { useState } from "react";

interface PromotionCodeEditModalProps {
    open: boolean;
    onClose: () => void;
    promotionCode: PromotionCode;
    onSave: (promotionCode: Partial<PromotionCode>) => void;
}

export default function PromotionCodeEditModal({ 
    open, 
    onClose, 
    promotionCode: initialPromotionCode,
    onSave 
}: PromotionCodeEditModalProps) {
    const [editedPromotionCode, setEditedPromotionCode] = useState({
        codigoID: initialPromotionCode.codigoID,
        codigo: initialPromotionCode.codigo,
        descuentoUSD: initialPromotionCode.descuentoUSD,
        fechaInicio: initialPromotionCode.fechaInicio,
        fechaFin: initialPromotionCode.fechaFin,
        usosTotales: initialPromotionCode.usosTotales,
        usosRealizados: initialPromotionCode.usosRealizados
    });

    const isFormValid = 
        editedPromotionCode.codigo && 
        editedPromotionCode.codigo.length > 0 &&
        !isNaN(Number(editedPromotionCode.descuentoUSD)) && 
        Number(editedPromotionCode.descuentoUSD) > 0 &&
        !isNaN(Number(editedPromotionCode.usosTotales)) && 
        Number(editedPromotionCode.usosTotales) >= editedPromotionCode.usosRealizados;

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
                        Editar Código de Descuento
                    </Typography>
                </Box>

                <Grid2 container spacing={2} padding={5}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            label="Código"
                            type="text"
                            name="codigo"
                            radius="lg"
                            value={editedPromotionCode.codigo}
                            onChange={(e) =>
                                setEditedPromotionCode({
                                    ...editedPromotionCode,
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
                            value={editedPromotionCode.descuentoUSD.toString()}
                            onChange={(e) =>
                                setEditedPromotionCode({
                                    ...editedPromotionCode,
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
                                    value={dayjs(editedPromotionCode.fechaInicio)}
                                    onChange={(date) =>
                                        setEditedPromotionCode({
                                            ...editedPromotionCode,
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
                                    value={dayjs(editedPromotionCode.fechaFin)}
                                    onChange={(date) =>
                                        setEditedPromotionCode({
                                            ...editedPromotionCode,
                                            fechaFin: date?.format() || dayjs().add(1, 'month').format()
                                        })
                                    }
                                    minDate={dayjs(editedPromotionCode.fechaInicio)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            label="Usos Totales"
                            type="number"
                            name="usosTotales"
                            radius="lg"
                            min={editedPromotionCode.usosRealizados}
                            value={editedPromotionCode.usosTotales.toString()}
                            onChange={(e) =>
                                setEditedPromotionCode({
                                    ...editedPromotionCode,
                                    usosTotales: parseInt(e.target.value)
                                })
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            isReadOnly
                            label="Usos Realizados"
                            type="number"
                            name="usosRealizados"
                            radius="lg"
                            value={editedPromotionCode.usosRealizados.toString()}
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
                        onClick={() => onSave(editedPromotionCode)} 
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
                        Guardar Cambios
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}