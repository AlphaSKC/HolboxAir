import { Box, Collapse, List, ListItem, ListSubheader, IconButton, Typography, Grid2, Button } from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BannerImg from '../../assets/img/others/BannerDeals.jpg';
import { Card, CardBody, Image } from "@nextui-org/react";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const dealsData = [
    {
        dateTime: "2025-01-15 10:00",
        price: "$200",
        passengers: 2,
        departure: "Cozumel",
        arrival: "Cancún"
    },
    {
        dateTime: "2025-02-20 15:00",
        price: "$150",
        passengers: 1,
        departure: "Playa del Carmen",
        arrival: "Holbox"
    },
    {
        dateTime: "2025-03-10 08:00",
        price: "$180",
        passengers: 3,
        departure: "Tulum",
        arrival: "Mérida"
    },
    {
        dateTime: "2025-03-25 12:00",
        price: "$220",
        passengers: 2,
        departure: "Cancún",
        arrival: "Playa del Carmen"
    },
    {
        dateTime: "2025-04-05 09:00",
        price: "$250",
        passengers: 1,
        departure: "Holbox",
        arrival: "Cozumel"
    },
    {
        dateTime: "2025-05-15 14:00",
        price: "$300",
        passengers: 4,
        departure: "Mérida",
        arrival: "Tulum"
    },
    {
        dateTime: "2025-06-20 16:00",
        price: "$350",
        passengers: 2,
        departure: "Cancún",
        arrival: "Holbox"
    },
    {
        dateTime: "2025-07-10 11:00",
        price: "$400",
        passengers: 3,
        departure: "Playa del Carmen",
        arrival: "Mérida"
    },
    {
        dateTime: "2025-08-25 13:00",
        price: "$450",
        passengers: 1,
        departure: "Tulum",
        arrival: "Cancún"
    },
    {
        dateTime: "2025-09-15 17:00",
        price: "$500",
        passengers: 2,
        departure: "Holbox",
        arrival: "Playa del Carmen"
    },
    {
        dateTime: "2025-10-05 10:00",
        price: "$550",
        passengers: 3,
        departure: "Cozumel",
        arrival: "Mérida"
    },
    {
        dateTime: "2025-11-20 18:00",
        price: "$600",
        passengers: 4,
        departure: "Cancún",
        arrival: "Tulum"
    },
    {
        dateTime: "2025-12-15 19:00",
        price: "$650",
        passengers: 2,
        departure: "Mérida",
        arrival: "Holbox"
    },
    {
        dateTime: "2025-12-25 20:00",
        price: "$700",
        passengers: 1,
        departure: "Playa del Carmen",
        arrival: "Cozumel"
    },
    {
        dateTime: "2026-01-10 10:00",
        price: "$210",
        passengers: 2,
        departure: "Cozumel",
        arrival: "Cancún"
    },
    {
        dateTime: "2026-02-15 15:00",
        price: "$160",
        passengers: 1,
        departure: "Playa del Carmen",
        arrival: "Holbox"
    },
    {
        dateTime: "2026-03-20 08:00",
        price: "$190",
        passengers: 3,
        departure: "Tulum",
        arrival: "Mérida"
    },
    {
        dateTime: "2026-04-25 12:00",
        price: "$230",
        passengers: 2,
        departure: "Cancún",
        arrival: "Playa del Carmen"
    },
    {
        dateTime: "2026-05-05 09:00",
        price: "$260",
        passengers: 1,
        departure: "Holbox",
        arrival: "Cozumel"
    },
    {
        dateTime: "2026-06-15 14:00",
        price: "$310",
        passengers: 4,
        departure: "Mérida",
        arrival: "Tulum"
    },
    {
        dateTime: "2026-07-20 16:00",
        price: "$360",
        passengers: 2,
        departure: "Cancún",
        arrival: "Holbox"
    },
    {
        dateTime: "2026-08-10 11:00",
        price: "$410",
        passengers: 3,
        departure: "Playa del Carmen",
        arrival: "Mérida"
    },
    {
        dateTime: "2026-09-25 13:00",
        price: "$460",
        passengers: 1,
        departure: "Tulum",
        arrival: "Cancún"
    },
    {
        dateTime: "2026-10-15 17:00",
        price: "$510",
        passengers: 2,
        departure: "Holbox",
        arrival: "Playa del Carmen"
    },
    {
        dateTime: "2026-11-05 10:00",
        price: "$560",
        passengers: 3,
        departure: "Cozumel",
        arrival: "Mérida"
    },
    {
        dateTime: "2026-12-20 18:00",
        price: "$610",
        passengers: 4,
        departure: "Cancún",
        arrival: "Tulum"
    },
    {
        dateTime: "2026-12-25 19:00",
        price: "$660",
        passengers: 2,
        departure: "Mérida",
        arrival: "Holbox"
    },
    {
        dateTime: "2026-12-30 20:00",
        price: "$710",
        passengers: 1,
        departure: "Playa del Carmen",
        arrival: "Cozumel"
    }
];

const classifyDealsByYearAndMonth = (deals: any) => {
    const currentDate = new Date();
    return deals.reduce((acc: any, deal: any) => {
        const date = new Date(deal.dateTime);
        if (date >= currentDate) {
            const year = date.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'long' });
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

export default function Deals() {
    const currentYear = new Date().getFullYear();
    const [open, setOpen] = useState<{ [key: string]: boolean }>({ [currentYear]: true });
    const dealsByYearAndMonth = classifyDealsByYearAndMonth(dealsData);

    const handleToggle = (key: string) => {
        setOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
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
                                                                                <CalendarMonthIcon sx={{ color: '#e68a00' }} /> {new Date(deal.dateTime).toLocaleDateString()}
                                                                            </Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={6}>
                                                                            <Typography variant="body1" className="text-justify Lato">
                                                                                <ScheduleIcon sx={{ color: '#e68a00' }} />  {new Date(deal.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                            </Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={6}>
                                                                            <Typography variant="body1" className="text-justify Lato">
                                                                                <GroupIcon sx={{ color: '#e6a800' }} /> {deal.passengers} {deal.passengers > 1 ? "passengers" : "passenger"}
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
                                                                    }}>
                                                                        Book Now
                                                                    </Button>
                                                                </Box>
                                                            </CardBody>
                                                        </Card>
                                                        {/* <Card>
                                                            <CardContent>
                                                                <Typography variant="h6">
                                                                    {deal.departure} to {deal.arrival}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    Date and Time: {deal.dateTime}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    Price: {deal.price}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    Passengers: {deal.passengers}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card> */}
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </Box>
                                ))}
                            </Box>
                        </Collapse>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}