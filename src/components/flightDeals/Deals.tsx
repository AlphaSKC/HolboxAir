import { Box, Collapse, List, ListItem, ListSubheader, IconButton, Typography, Card, CardContent } from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BannerImg from '../../assets/img/others/BannerDeals.jpg';

const dealsData = [
    {
        dateTime: "2025-01-15 10:00",
        price: "$200",
        passengers: 2,
        departure: "New York",
        arrival: "Los Angeles"
    },
    {
        dateTime: "2025-02-20 15:00",
        price: "$150",
        passengers: 1,
        departure: "Chicago",
        arrival: "Miami"
    },
    {
        dateTime: "2025-03-10 08:00",
        price: "$180",
        passengers: 3,
        departure: "San Francisco",
        arrival: "Seattle"
    },
    {
        dateTime: "2025-03-25 12:00",
        price: "$220",
        passengers: 2,
        departure: "Houston",
        arrival: "Denver"
    },
    {
        dateTime: "2025-03-25 12:00",
        price: "$220",
        passengers: 2,
        departure: "Houston",
        arrival: "Denver"
    },
    {
        dateTime: "2025-03-25 12:00",
        price: "$220",
        passengers: 2,
        departure: "Houston",
        arrival: "Denver"
    },
    {
        dateTime: "2025-03-25 12:00",
        price: "$220",
        passengers: 2,
        departure: "Houston",
        arrival: "Denver"
    },
    {
        dateTime: "2025-04-05 09:00",
        price: "$250",
        passengers: 1,
        departure: "Boston",
        arrival: "Washington D.C."
    },
    {
        dateTime: "2025-05-15 14:00",
        price: "$300",
        passengers: 4,
        departure: "Atlanta",
        arrival: "Orlando"
    },
    {
        dateTime: "2025-06-20 16:00",
        price: "$350",
        passengers: 2,
        departure: "Dallas",
        arrival: "Las Vegas"
    },
    {
        dateTime: "2025-07-10 11:00",
        price: "$400",
        passengers: 3,
        departure: "Phoenix",
        arrival: "San Diego"
    },
    {
        dateTime: "2025-08-25 13:00",
        price: "$450",
        passengers: 1,
        departure: "Philadelphia",
        arrival: "Charlotte"
    },
    {
        dateTime: "2025-09-15 17:00",
        price: "$500",
        passengers: 2,
        departure: "San Antonio",
        arrival: "Austin"
    },
    {
        dateTime: "2025-10-05 10:00",
        price: "$550",
        passengers: 3,
        departure: "San Jose",
        arrival: "Portland"
    },
    {
        dateTime: "2025-11-20 18:00",
        price: "$600",
        passengers: 4,
        departure: "Jacksonville",
        arrival: "Nashville"
    },
    {
        dateTime: "2025-12-15 19:00",
        price: "$650",
        passengers: 2,
        departure: "Columbus",
        arrival: "Indianapolis"
    },
    {
        dateTime: "2025-12-25 20:00",
        price: "$700",
        passengers: 1,
        departure: "Fort Worth",
        arrival: "El Paso"
    },
    {
        dateTime: "2026-01-10 10:00",
        price: "$210",
        passengers: 2,
        departure: "New York",
        arrival: "Los Angeles"
    },
    {
        dateTime: "2026-02-15 15:00",
        price: "$160",
        passengers: 1,
        departure: "Chicago",
        arrival: "Miami"
    },
    {
        dateTime: "2026-03-20 08:00",
        price: "$190",
        passengers: 3,
        departure: "San Francisco",
        arrival: "Seattle"
    },
    {
        dateTime: "2026-04-25 12:00",
        price: "$230",
        passengers: 2,
        departure: "Houston",
        arrival: "Denver"
    },
    {
        dateTime: "2026-05-05 09:00",
        price: "$260",
        passengers: 1,
        departure: "Boston",
        arrival: "Washington D.C."
    },
    {
        dateTime: "2026-06-15 14:00",
        price: "$310",
        passengers: 4,
        departure: "Atlanta",
        arrival: "Orlando"
    },
    {
        dateTime: "2026-07-20 16:00",
        price: "$360",
        passengers: 2,
        departure: "Dallas",
        arrival: "Las Vegas"
    },
    {
        dateTime: "2026-08-10 11:00",
        price: "$410",
        passengers: 3,
        departure: "Phoenix",
        arrival: "San Diego"
    },
    {
        dateTime: "2026-09-25 13:00",
        price: "$460",
        passengers: 1,
        departure: "Philadelphia",
        arrival: "Charlotte"
    },
    {
        dateTime: "2026-10-15 17:00",
        price: "$510",
        passengers: 2,
        departure: "San Antonio",
        arrival: "Austin"
    },
    {
        dateTime: "2026-11-05 10:00",
        price: "$560",
        passengers: 3,
        departure: "San Jose",
        arrival: "Portland"
    },
    {
        dateTime: "2026-12-20 18:00",
        price: "$610",
        passengers: 4,
        departure: "Jacksonville",
        arrival: "Nashville"
    },
    {
        dateTime: "2026-12-25 19:00",
        price: "$660",
        passengers: 2,
        departure: "Columbus",
        arrival: "Indianapolis"
    },
    {
        dateTime: "2026-12-30 20:00",
        price: "$710",
        passengers: 1,
        departure: "Fort Worth",
        arrival: "El Paso"
    }
];

const classifyDealsByYearAndMonth = (deals: any) => {
    const currentDate = new Date();
    return deals.reduce((acc: any, deal: any) => {
        const date = new Date(deal.dateTime);
        if (date >= currentDate) {
            const year = date.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'long'});
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
                        <Collapse in={open[year]} timeout="auto" unmountOnExit sx={{mt: "10px"}}>
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
                                                        <Card>
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
                ))}
            </Box>
        </Box>
    );
}