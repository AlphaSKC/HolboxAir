import { Box, Grid2, Typography } from "@mui/material";

import LuggageIcon from '@mui/icons-material/Luggage';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import HelpIcon from '@mui/icons-material/Help';

const Topics = [
    {
        id: 1,
        icon: LuggageIcon,
        title: "Baggage Allowance",
    },
    {
        id: 2,
        icon: EventBusyIcon,
        title: "Cancellation policy",
    },
    {
        id: 3,
        icon: CalendarMonthOutlinedIcon,
        title: "Change Flight",
    },
    {
        id: 4,
        icon: AttachMoneyIcon,
        title: "Exchange Rate",
    },
    {
        id: 5,
        icon: BedtimeOutlinedIcon,
        title: "Night Arrival",
    },
    {
        id: 6,
        icon: HelpIcon,
        title: "Help",
    }
]

export default function PopularTopics() {
    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: '#333',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingY: '1rem',
        }}>
            <Box className="block2" sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography className="Oswald" sx={{
                    fontSize: '4vh',
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                    Popular Topics
                </Typography>
                <Grid2 container spacing={5} sx={{ marginY: '1rem', justifyContent: 'center', width: '70%' }}>
                    {Topics.map((topic) => (
                        <Grid2 size={{ xs: 6, md: 4 }} key={topic.id} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1.2vh',
                        }}>
                            <Box sx={{
                                width: 'fit-content',
                                padding: '1rem',
                                borderRadius: '100%',
                                backgroundColor: 'white',
                            }}>
                                <topic.icon sx={{ fontSize: '5vh' }} />
                            </Box>
                            <Typography className="Lato" sx={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: '2.5vh',
                                fontWeight: '300',
                            }}>
                                {topic.title}
                            </Typography>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>

        </Box>
    );
}