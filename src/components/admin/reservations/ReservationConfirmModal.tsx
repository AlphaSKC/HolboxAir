import { Box, Grid2, Modal, Typography, Button } from "@mui/material";
import { Input } from "@nextui-org/react";

interface ReservationConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmData: any;
    setConfirmData: (data: any) => void;
}

const ReservationConfirmModal: React.FC<ReservationConfirmModalProps> = ({ open, onClose, onConfirm, confirmData, setConfirmData }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                    height: { xs: "60%", md: "50%" },
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
                    <Typography className="Lato" component="h1" fontSize={20} fontWeight={600} marginBottom={2} padding={5}>
                        Confirmar vuelo
                    </Typography>
                </Box>

                {/* Content */}
                <Grid2 container spacing={2} padding={5} sx={{ overflowY: "scroll", maxHeight: "70%" }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            label='Codigo de vuelo'
                            type="text"
                            name="codigo"
                            value={confirmData.codigo}
                            onChange={(e) => setConfirmData({ ...confirmData, codigo: e.target.value })}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Input
                            label='Monto Pagado'
                            type="number"
                            name="montoPagado"
                            value={confirmData.montoPagado.toString()}
                            onChange={(e) => setConfirmData({ ...confirmData, montoPagado: parseFloat(e.target.value) })}
                            min={1}
                        />
                    </Grid2>
                </Grid2>

                {/* Confirm Button */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "20px",
                }}>
                    <Button variant="outlined"
                        onClick={onConfirm}
                        size="small"
                        sx={{
                            borderRadius: "20px",
                            color: "#10E5A5",
                            borderColor: "#10E5A5",
                            padding: '10px',
                            ":disabled": {
                                color: "#a8a8a8",
                                borderColor: "#a8a8a8",
                            }
                        }}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ReservationConfirmModal;
