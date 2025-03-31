import { Box, Collapse, List, ListItem, ListSubheader, IconButton, Typography, Grid2, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BannerImg from '../../assets/img/others/BannerDeals.jpg';
import { Card, CardBody, Image } from "@nextui-org/react";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Deal } from "../../types/types";
import { GetDeals } from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
import NoDealsImg from '../../assets/img/others/NoFlights.svg'; 

const classifyDealsByYearAndMonth = (deals: any) => {
    return deals.reduce((acc: any, deal: any) => {
        const date = new Date(deal.fechaSalida);
        const year = date.getFullYear();
        const month = date.toLocaleString('en-US', { month: 'long' });
        if (!acc[year]) {
            acc[year] = {};
        }
        if (!acc[year][month]) {
            acc[year][month] = [];
        }
        acc[year][month].push({
            id: deal.ofertaID,
            departure: deal.origen,
            arrival: deal.destino,
            dateTime: deal.fechaSalida,
            passengers: deal.disponibilidad,
            price: deal.precio
        });
        return acc;
    }, {});
};

const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return { date: "N/A", time: "" };
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    return {
        date: date.toLocaleDateString("en-US", optionsDate),
        time: date.toLocaleTimeString("en-US", optionsTime),
    };
};

export default function Deals() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    const [open, setOpen] = useState<{ [key: string]: boolean }>({ [currentYear]: true, [`${currentYear}-${currentMonth}`]: true });
    const [deals, setDeals] = useState<Deal[]>([]);
    const dealsByYearAndMonth = classifyDealsByYearAndMonth(deals);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleToggle = (key: string) => {
        setOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
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

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "20px",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "20vh",
                paddingX: "12%",
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${BannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <Typography className="Oswald" sx={{ color: 'white', fontWeight: 'bold', fontSize: '4vh' }}>
                    Flight Deals
                </Typography>
                <Typography className="Lato" sx={{ color: 'white', textAlign: 'center', fontSize: '2.3vh' }}>
                    If your plan is flexible, this could be a great option for you. Find special fares in our list of deals.
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                px: "6vw",
            }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress sx={{ color: '#E68A00' }} />
                    </Box>
                ) : deals.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50vh',
                        textAlign: 'center',
                        gap: '20px',
                    }}>
                        <img src={NoDealsImg} alt="No Deals" style={{ maxWidth: '300px', borderRadius: '10px' }} />
                        <Typography className="Oswald" sx={{ fontSize: '3vh', fontWeight: 'bold', color: '#E68A00' }}>
                            No flight deals available at the moment
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2vh', color: '#555' }}>
                            Stay tuned! We are constantly updating our deals to bring you the best offers.
                        </Typography>
                    </Box>
                ) : (
                    Object.keys(dealsByYearAndMonth).map(year => (
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
                                            <ListSubheader component="div" sx={{ display: "flex", alignItems: "center", textTransform: "capitalize", position: "relative" }}>
                                                {month}
                                                <IconButton onClick={() => handleToggle(`${year}-${month}`)}>
                                                    {open[`${year}-${month}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </ListSubheader>
                                            <Collapse in={open[`${year}-${month}`]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px" }}>
                                                    {dealsByYearAndMonth[year][month].map((deal: any, index: any) => (
                                                        <ListItem key={index} sx={{ width: "fit-content" }}>
                                                            <Card
                                                                key={deal.id}
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
                                                                                    <FlightTakeoffIcon sx={{ color: '#e68a00' }} /> {deal.departure} to {deal.arrival}
                                                                                </Typography>
                                                                            </Grid2>
                                                                            <Grid2 size={6}>
                                                                                <Typography variant="body1" className="text-justify Lato">
                                                                                    <CalendarMonthIcon sx={{ color: '#e68a00' }} /> {formatDateTime(deal.dateTime).date}
                                                                                </Typography>
                                                                            </Grid2>
                                                                            <Grid2 size={6}>
                                                                                <Typography variant="body1" className="text-justify Lato">
                                                                                    <ScheduleIcon sx={{ color: '#e68a00' }} />  {formatDateTime(deal.dateTime).time}
                                                                                </Typography>
                                                                            </Grid2>
                                                                            <Grid2 size={6}>
                                                                                <Typography variant="body1" className="text-justify Lato">
                                                                                    <GroupIcon sx={{ color: '#e6a800' }} /> {deal.passengers} {deal.passengers > 1 ? "seats" : "seat"} left
                                                                                </Typography>
                                                                            </Grid2>
                                                                            <Grid2 size={6}>
                                                                                <Typography variant="body1" className="text-justify Lato">
                                                                                    <AttachMoneyIcon sx={{ color: '#e6a800' }} /> {deal.price} USD
                                                                                </Typography>
                                                                            </Grid2>
                                                                        </Grid2>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                        <Button className="Lato" sx={{
                                                                            mt: '10px',
                                                                            width: 'fit-content',
                                                                            padding: '10px 20px',
                                                                            borderRadius: '10px',
                                                                            backgroundColor: '#e68a00',
                                                                            textTransform: 'none',
                                                                            fontWeight: 'bold',
                                                                            color: 'white',
                                                                            '&:hover': {
                                                                                bgcolor: "white",
                                                                                color: "#e68a00",
                                                                            }
                                                                        }}
                                                                            onClick={() => {
                                                                                navigate('/checkoutDeal', {
                                                                                    state: {
                                                                                        ofertaID: deal.id,
                                                                                        origen: deal.departure,
                                                                                        destino: deal.arrival,
                                                                                        fechaSalida: deal.dateTime,
                                                                                        disponibilidad: deal.passengers,
                                                                                        precio: deal.price
                                                                                    }
                                                                                });
                                                                            }}
                                                                        >
                                                                            Book Now
                                                                        </Button>
                                                                    </Box>
                                                                </CardBody>
                                                            </Card>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
}