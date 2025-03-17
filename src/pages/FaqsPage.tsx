import { Box, Typography, Collapse, List, ListSubheader, IconButton } from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const questions = [
    "What form of payment do you accept?",
    "What information do I need to provide for booking?",
    "What is the baggage allowance?",
    "What time should I book my flight if I am arriving in international flight?",
    "What time should I book my flight if I am arriving in domestic flight?",
    "What is your cancellation policy?",
    "What airport do you fly to Holbox?",
];

const answers = [
    "Cash, Wire transfer, Visa, Master Card, American Express, Bitcoin.",
    "-All passengers name in full\n-Boarding pass of your airline arrival flight (for flights departing from Cancún)\n-Email",
    "1 checked bag 20kgs (44lbs)\n+\n1 carry-bag 5kgs (11lbs)",
    "We recommend you book your flight 01:15 after the estimated time of arrival of your airline flight, giving you time to clear customs and collect your bags.",
    "We recommend you book your flight 45 min after the estimated time of arrival of your airline flight.",
    "Cancellations with at least 72 hours in advance before the flight do not generate charge. The return to the customer will be 100%\n\nCancellations made with less than 72 hours before the flight are not subject to refunds.\n\n<b>PEAK SEASON (DEC 24 - JAN 7)</b>\nNon-refundable\n\nPlease note that even though the refund is processed at 100%, bank fees may reduce the final amount",
    "You can fly into Holbox from Cancun International Airport, Playa del Carmen, Tulum, Cozumel, Merida."
];

export default function FaqsPage() {
    const [open, setOpen] = useState(Array(questions.length).fill(false));

    const handleToggle = (index: number) => {
        setOpen(prev => {
            const newOpen = [...prev];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowX: 'hidden',
            py: 4
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
            }}>
                <Typography variant="h4" component="h1" gutterBottom className="Lato">
                    Frequently asked questions
                </Typography>
                <List sx={{ width: '100%', mt: 4 }}>
                    {questions.map((question, index) => (
                        <Box key={index} sx={{ marginBottom: "20px" }}>
                            <ListSubheader component="div" sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "3.2vh",
                                fontWeight: "bold",
                                color: '#F5F5F5',
                                bgcolor: '#E68A00',
                                borderRadius: "5px",
                                position: "relative",
                            }} className="Lato">
                                {question}
                                <IconButton onClick={() => handleToggle(index)}>
                                    {open[index] ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                                </IconButton>
                            </ListSubheader>
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <Box sx={{ py: 4, pl: 4, mt: 2, bgcolor: '#F5F5F5', borderRadius: "5px" }}>
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: answers[index] }} className="Lato" />
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </List>
                <Typography variant="body1" sx={{ mt: 4 }} className="Lato">
                    If these FAQ's do not help you don't hesitate to contact us, we will be glad to assist you.
                </Typography>
            </Box>
        </Box>
    )
}