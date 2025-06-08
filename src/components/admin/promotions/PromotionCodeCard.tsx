import { Box, Button, Typography, Switch } from "@mui/material";
import { Card, CardBody } from "@nextui-org/react";
import { CancelCircleIcon, Edit02Icon } from "hugeicons-react";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { PromotionCode } from "../../../types/types";

interface PromotionCodeCardProps {
    promotionCode: PromotionCode;
    onEdit: () => void;
    onDelete: () => void;
    onStatusChange?: (newStatus: boolean) => void;
}

export default function PromotionCodeCard({
    promotionCode,
    onEdit,
    onDelete,
    onStatusChange
}: PromotionCodeCardProps) {
    return (
        <Card 
            className="border-none bg-background/60 dark:bg-default-100/50"
            shadow="sm"
        >
            <CardBody>
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ 
                            fontSize: '2.5vh', 
                            fontWeight: '700', 
                            color: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }} 
                        className="Lato"
                        >
                            <LocalOfferIcon sx={{ color: '#e68a00' }} /> 
                            {promotionCode.codigo}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AttachMoneyIcon sx={{ color: '#e68a00' }} />
                            <Typography variant="body1" className="Lato">
                                {promotionCode.descuentoUSD} USD de descuento
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarMonthIcon sx={{ color: '#e68a00' }} />
                            <Typography variant="body1" className="Lato">
                                {new Date(promotionCode.fechaInicio).toLocaleDateString('es-ES')} - {new Date(promotionCode.fechaFin).toLocaleDateString('es-ES')}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupIcon sx={{ color: '#e68a00' }} />
                            <Typography variant="body1" className="Lato">
                                {promotionCode.usosRealizados} de {promotionCode.usosTotales} usos realizados
                            </Typography>
                        </Box>

                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            backgroundColor: promotionCode.activo ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 77, 79, 0.1)',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            transition: 'background-color 0.3s ease'
                        }}>
                            {promotionCode.activo ? (
                                <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                            ) : (
                                <CancelIcon sx={{ color: '#FF4D4F' }} />
                            )}
                            <Typography variant="body1" className="Lato" sx={{ flex: 1 }}>
                                {promotionCode.activo ? "Activo" : "Inactivo"}
                            </Typography>
                            <Switch
                                checked={promotionCode.activo}
                                onChange={(e) => onStatusChange?.(e.target.checked)}
                                disabled={promotionCode.usosRealizados == promotionCode.usosTotales}
                                sx={{
                                    '& .MuiSwitch-switchBase': {
                                        '&.Mui-checked': {
                                            color: '#4CAF50',
                                            '& + .MuiSwitch-track': {
                                                backgroundColor: '#4CAF50',
                                                opacity: 0.5,
                                            },
                                        },
                                        '&.Mui-disabled': {
                                            '& + .MuiSwitch-track': {
                                                opacity: 0.3,
                                            },
                                        },
                                    },
                                    '& .MuiSwitch-track': {
                                        backgroundColor: '#FF4D4F',
                                        opacity: 0.3,
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={onEdit}
                                sx={{
                                    borderRadius: "20px",
                                    color: "#2196F3",
                                    borderColor: "#2196F3",
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                        borderColor: '#2196F3',
                                        color: '#2196F3'
                                    }
                                }}
                            >
                                <Edit02Icon />
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={onDelete}
                                sx={{
                                    borderRadius: "20px",
                                    color: "#FF4D4F",
                                    borderColor: "#FF4D4F",
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 77, 79, 0.1)',
                                        borderColor: '#FF4D4F',
                                        color: '#FF4D4F'
                                    },
                                    
                                }}
                            >
                                <CancelCircleIcon />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </CardBody>
        </Card>
    );
} 