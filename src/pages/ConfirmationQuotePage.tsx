import { Box, Button, Grid2, Typography } from "@mui/material";

import Confirmation from "../assets/img/others/ConfirmationImage.svg";
import {  useNavigate } from "react-router-dom";

export default function ConfirmationQuote() {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: "50vh", marginBottom: '3vh', padding: '10vh 5vw' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>
                    <img src={Confirmation} alt="Confirmation" />
                </Grid2>
            </Grid2>
            <Grid2 size={12}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography className="Lato" sx={{ fontSize: '4vh', fontWeight: '700', color: '#e68a00' }}>
                        Your quote has been successfully created. The quote code has been sent to the email you provided.
                    </Typography>
                    <Button className="Lato" sx={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#e68a00',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: '700',
                        fontSize: '2.2vh',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: '#e68a00'
                        }
                    }}
                        onClick={() => {
                            localStorage.removeItem('quoteCompleted');
                            navigate('/')
                        }}
                    >
                        Go to home
                    </Button>
                </Box>
            </Grid2>
        </Box>
    )
}