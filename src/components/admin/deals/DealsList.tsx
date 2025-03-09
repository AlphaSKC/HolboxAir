import { Box, CircularProgress, Collapse, ListSubheader, IconButton, Typography, Button, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardBody, Image } from "@nextui-org/react";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { GetDeals } from "../../../services/AdminService";
import { CancelCircleIcon, MessageEdit01Icon } from "hugeicons-react";
import { formatDateTimeMex } from "../../../utils/utils";
import { Deal } from "../../../types/types";

const classifyDealsByYearAndMonth = (deals: any) => {
    const currentDate = new Date();
    return deals.reduce((acc: any, deal: any) => {
        const date = new Date(deal.fechaSalida);
        if (date >= currentDate) {
            const year = date.getFullYear();
            const month = date.toLocaleString('es-ES', { month: 'long' });
            if (!acc[year]) {
                acc[year] = {};
            }
            if (!acc[year][month]) {
                acc[year][month] = [];
            }
            acc[year][month].push(deal);
        }
        return acc;
    }, {});
};

export default function DealsList() {
    const currentYear = new Date().getFullYear();
    const [open, setOpen] = useState<{ [key: string]: boolean }>({ [currentYear]: true });
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await GetDeals();
            setDeals(response);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleToggle = (key: string) => {
        setOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    const dealsByYearAndMonth = classifyDealsByYearAndMonth(deals);

    return (
        <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
            {loading ? (
                <CircularProgress sx={{ color: "#E68A00" }} />
            ) : (
                <Box sx={{ width: "100%" }}>
                    {Object.keys(dealsByYearAndMonth).map(year => (
                        <Box key={year} sx={{ marginBottom: "20px" }}>
                            <ListSubheader className="Lato" component="div" sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "3.2vh",
                                fontWeight: "bold",
                                color: '#F5F5F5',
                                bgcolor: '#E68A00',
                                borderRadius: "10px",
                                position: "relative",
                            }}>
                                {year}
                                <IconButton onClick={() => handleToggle(year)}>
                                    {open[year] ? <ExpandLessIcon sx={{ color: '#F5F5F5' }} /> : <ExpandMoreIcon sx={{ color: '#F5F5F5' }} />}
                                </IconButton>
                            </ListSubheader>
                            <Collapse in={open[year]} timeout="auto" unmountOnExit sx={{ mt: "10px" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", px: "3vw" }}>
                                    {Object.keys(dealsByYearAndMonth[year]).map(month => (
                                        <Box key={month} sx={{ marginBottom: "20px" }}>
                                            <ListSubheader component="div" sx={{ display: "flex", alignItems: "center", textTransform: "capitalize", position: "relative", borderRadius: "10px" }}>
                                                {month}
                                                <IconButton onClick={() => handleToggle(`${year}-${month}`)}>
                                                    {open[`${year}-${month}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </ListSubheader>
                                            <Collapse in={open[`${year}-${month}`]} timeout="auto" unmountOnExit>
                                                <Grid2 container spacing={2} mt={1}>
                                                    {dealsByYearAndMonth[year][month].map((deal: any, index: any) => (
                                                        <Grid2 container size={{ xs: 12, md: 6 }} key={index}>
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
                                                                                src="https://heroui.com/images/album-cover.png"
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
                                                                                    <GroupIcon sx={{ color: '#e6a800' }} /> {deal.disponibilidad} {deal.disponibilidad > 1 ? "asientos disponibles" : "asiento disponible"}
                                                                                </Typography>
                                                                            </Grid2>
                                                                            <Grid2 size={6}>
                                                                                <Typography variant="body1" className="text-justify Lato">
                                                                                    <AttachMoneyIcon sx={{ color: '#e6a800' }} /> {deal.precio} USD
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
                                                                                color: "#2196F3",
                                                                                borderColor: "#2196F3",
                                                                            }}
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
                                                                        >
                                                                            <CancelCircleIcon />
                                                                        </Button>
                                                                    </Box>
                                                                </CardBody>
                                                            </Card>
                                                        </Grid2>
                                                    ))}
                                                </Grid2>
                                            </Collapse>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}