import { Card, CardBody, Image } from "@nextui-org/react";
import { Deal } from "../../../types/types";
import { Box, Button, Grid2, Typography } from "@mui/material";

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatDateTimeMex } from "../../../utils/utils";
import { ViewIcon, MessageEdit01Icon, CancelCircleIcon } from "hugeicons-react";

import DefaultFlight from "../../../assets/img/others/DefaultFlights.jpg";

interface DealCardProps {
    deal: Deal;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onView, onDelete, onEdit }) => {
    return (
        <Card
            key={deal.ofertaID}
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
        >
            <CardBody>
                <Box className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <Box className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src={DefaultFlight}
                            width="100%"
                        />
                    </Box>
                    <Grid2 container spacing={2} className="col-span-6 md:col-span-8">
                        <Grid2 size={12}>
                            <Typography sx={{ fontSize: '3.5vh', fontWeight: '700', color: '#000' }} className="Lato">
                                <FlightTakeoffIcon sx={{ color: '#e68a00' }} /> {deal.origen} to {deal.destino}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body1" className="text-justify Lato">
                                <CalendarMonthIcon sx={{ color: '#e68a00' }} /> {formatDateTimeMex(deal.fechaSalida).date}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body1" className="text-justify Lato">
                                <ScheduleIcon sx={{ color: '#e68a00' }} />  {formatDateTimeMex(deal.fechaSalida).time}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body1" className="text-justify Lato">
                                <GroupIcon sx={{ color: '#E68A00' }} /> {deal.disponibilidad} {deal.disponibilidad > 1 ? "asientos disponibles" : "asiento disponible"}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body1" className="text-justify Lato">
                                <AttachMoneyIcon sx={{ color: '#E68A00' }} /> {deal.precio} USD
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        style={{
                            borderRadius: "20px",
                            color: "#a8a8a8",
                            borderColor: "#a8a8a8",
                        }}
                        onClick={onView}
                    >
                        <ViewIcon />
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        style={{
                            borderRadius: "20px",
                            color: "#2196F3",
                            borderColor: "#2196F3",
                        }}
                        onClick={onEdit}
                    >
                        <MessageEdit01Icon />
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        style={{
                            borderRadius: "20px",
                            color: "#FF4D4F",
                            borderColor: "#FF4D4F",
                        }}
                        onClick={onDelete}
                    >
                        <CancelCircleIcon />
                    </Button>
                </Box>
            </CardBody>
        </Card>
    )
}

export default DealCard;