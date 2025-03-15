import { Box, Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SuccessfulPurchase from "../assets/img/others/SuccesfulPurchase.svg";

export default function ConfirmationFlightPage() {

    const navigate = useNavigate();
    return (
        <Box sx={{ minHeight: "50vh", marginBottom: '3vh', padding: '10vh 5vw' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>
                    <img src={SuccessfulPurchase} alt="Confirmation" />
                </Grid2>
            </Grid2>
            <Grid2 size={12}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography className="Lato" sx={{ fontSize: '4vh', fontWeight: '700', color: '#e68a00' }}>
                        Your flight has been successfully booked. We will contact you shortly for the logistics.
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
                            localStorage.clear();
                            setTimeout(() => {
                                navigate('/');
                            }, 100);
                        }}
                    >
                        Go to home
                    </Button>
                </Box>
            </Grid2>
        </Box>
    );
}