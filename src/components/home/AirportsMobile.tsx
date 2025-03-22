import { Box, Grid2, Typography } from "@mui/material";

import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

import AirportsData from "../../utils/AirportsData.json";
import { useNavigate } from "react-router-dom";

export default function AirportsMobile() {

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
        }} data-aos="fade-right">
            <Typography className="Oswald" sx={{
                fontSize: '4vh',
                color: 'black',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                Find out some departing points.
            </Typography>
            <Grid2 container sx={{ width: '100%', mt: '2vh' }}>
                {AirportsData.map((airport) => (
                    <Grid2 size={6} key={airport.id} sx={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${airport.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '20vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        onClick={() => {
                            navigate(airport.route);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <Typography className="Oswald" sx={{
                            fontSize: '3vh',
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            padding: '1vh',
                        }}>
                            {airport.name}
                        </Typography>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}