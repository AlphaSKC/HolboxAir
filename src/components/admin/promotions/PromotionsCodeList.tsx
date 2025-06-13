import { Box, CircularProgress, Typography, Grid2, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { CreatePromotionCode, GetPromotionsCodes, UpdatePromotionCode, ChangeStatusPromotionCode, DeletePromotionCode } from "../../../services/AdminService";
import PromotionCodeCard from "./PromotionCodeCard";
import { TickDouble03Icon } from "hugeicons-react";
import PromotionCodeCreateModal from "./PromotionCodeCreateModal";
import PromotionCodeEditModal from "./PromotionCodeEditModal";
import { PromotionCode } from "../../../types/types";
import AlertSnackbar from "../../general/AlertSnackbar";

export default function PromotionsCodeList() {
    const [loading, setLoading] = useState(true);
    const [promotionsCodes, setPromotionsCodes] = useState<any[]>([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedPromotionCode, setSelectedPromotionCode] = useState<PromotionCode | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

    useEffect(() => {
        fetchPromotionsCodes();
    }, []);

    const fetchPromotionsCodes = async () => {
        try {
            const response = await GetPromotionsCodes();
            setPromotionsCodes(response);
        }
        catch (error) {
            setAlertMessage("Error al obtener los códigos de descuento");
            setAlertSeverity("error");
            setOpenAlert(true);
        }
        finally {
            setLoading(false);
        }
    }

    const handleCreatePromotion = async (promotionCode: Partial<PromotionCode>) => {
        try {
            const response = await CreatePromotionCode(promotionCode);
            if (response.success) {
                setAlertMessage("Código de descuento creado correctamente");
                setAlertSeverity("success");
            } else {
                setAlertMessage("Error al crear el código de descuento");
                setAlertSeverity("error");
            }
        }
        catch (error) {
            setAlertMessage("Error al crear el código de descuento");
            setAlertSeverity("error");
        }
        finally {
            fetchPromotionsCodes();
            setOpenCreateModal(false);
            setOpenAlert(true);
        }
    }

    const handleEditPromotion = async (promotionCode: Partial<PromotionCode>) => {
        try {
            const editData = {
                codigoID: promotionCode.codigoID,
                codigo: promotionCode.codigo,
                descuentoUSD: promotionCode.descuentoUSD,
                fechaInicio: promotionCode.fechaInicio,
                fechaFin: promotionCode.fechaFin,
                usosTotales: promotionCode.usosTotales,
                usosRealizados: promotionCode.usosRealizados
            };
            
            const response = await UpdatePromotionCode(editData);
            if (response.success) {
                setAlertMessage("Código de descuento actualizado correctamente");
                setAlertSeverity("success");
            } else {
                setAlertMessage("Error al actualizar el código de descuento");
                setAlertSeverity("error");
            }
        }
        catch (error) {
            setAlertMessage("Error al actualizar el código de descuento");
            setAlertSeverity("error");
        }
        finally {
            fetchPromotionsCodes();
            setOpenEditModal(false);
            setSelectedPromotionCode(null);
            setOpenAlert(true);
        }
    }

    const handleStatusChange = async (promotionCode: PromotionCode, newStatus: boolean) => {
        try {
            const response = await ChangeStatusPromotionCode({
                codigoID: promotionCode.codigo,
                estado: newStatus
            });
            if (response.success) {
                setAlertMessage(`Código de descuento ${newStatus ? 'activado' : 'desactivado'} correctamente`);
                setAlertSeverity("success");
            } else {
                setAlertMessage(`Error al ${newStatus ? 'activar' : 'desactivar'} el código de descuento`);
                setAlertSeverity("error");
            }
        }
        catch (error) {
            setAlertMessage("Error al cambiar el estado del código de descuento");
            setAlertSeverity("error");
            console.log(error);
        }
        finally {
            fetchPromotionsCodes();
            setOpenAlert(true);
        }
    }

    const handleDeletePromotion = async (id: number) => {
        try {
            const response = await DeletePromotionCode(id);
            if (response.success) {
                setAlertMessage("Código de descuento eliminado correctamente");
                setAlertSeverity("success");
            } else {
                setAlertMessage("Error al eliminar el código de descuento");
                setAlertSeverity("error");
            }
        }
        catch (error) {
            setAlertMessage("Error al eliminar el código de descuento");
            setAlertSeverity("error");
        }
        finally {
            fetchPromotionsCodes();
            setOpenDialog(false);
            setOpenAlert(true);
        }
    }

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#E68A00" }} className="Lato">
                Lista de Códigos de Descuento
            </Typography>

            <Button 
                className="Lato" 
                variant="outlined" 
                onClick={() => setOpenCreateModal(true)} 
                size="medium" 
                sx={{ 
                    borderRadius: "20px", 
                    color: "#E68A00", 
                    borderColor: "#E68A00", 
                    padding: "10px 20px",
                    marginBottom: "20px",
                    '&:hover': {
                        backgroundColor: '#FFF5E6',
                        borderColor: '#E68A00',
                        color: '#E68A00'
                    }
                }}
            >
                Crear código de descuento
                <TickDouble03Icon style={{ marginLeft: '5px' }} />
            </Button>

            <Box sx={{ width: { xs: '100%', md: '90%', lg: '80%' } }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                        <CircularProgress sx={{ color: '#E68A00' }} />
                    </Box>
                ) : (
                    <Grid2 container spacing={3} sx={{ placeContent: "center" }}>
                        {promotionsCodes.map((promotion) => (
                            <Grid2 key={promotion.codigoID} size={{ xs: 12, md: 6, lg: 3 }}>
                                <PromotionCodeCard
                                    promotionCode={promotion}
                                    onEdit={() => {
                                        setSelectedPromotionCode(promotion);
                                        setOpenEditModal(true);
                                    }}
                                    onDelete={() => {
                                        setSelectedPromotionCode(promotion);
                                        setOpenDialog(true);
                                    }}
                                    onStatusChange={(newStatus) => handleStatusChange(promotion, newStatus)}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                )}
            </Box>

            <PromotionCodeCreateModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                onSave={handleCreatePromotion}
            />

            {selectedPromotionCode && (
                <PromotionCodeEditModal
                    open={openEditModal}
                    onClose={() => {
                        setOpenEditModal(false);
                        setSelectedPromotionCode(null);
                    }}
                    promotionCode={selectedPromotionCode}
                    onSave={handleEditPromotion}
                />
            )}

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Eliminar código de descuento
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este código de descuento?
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
                        onClick={() => handleDeletePromotion(selectedPromotionCode?.codigoID || 0)}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            <AlertSnackbar 
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                message={alertMessage}
                severity={alertSeverity}
            />
        </Box>
    )
}