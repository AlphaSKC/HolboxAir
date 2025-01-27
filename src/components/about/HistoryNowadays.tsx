import { Box, Grid2, Typography } from "@mui/material";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function HistoryNowadays() {

    useEffect(() => {
        AOS.init();
    },[]);

    return (
        <Box data-aos="fade-up" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: '3vh',
        }}>
            <Grid2 container spacing={6} sx={{ width: '70%', padding: '2vh', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px #d4d4d4' }}>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: '2vh',
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: 'black',
                        fontWeight: '500',
                    }}>
                        History
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5vh',
                    }}>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            In 2019 a proyect named "Aero Holbox" was developed to connect Holbox with Cancún for those travelers were looking for a fast way to reach the island
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            Soon demand was growing and new routes like Playa del Carmen and Cozumel were opened.
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            In 2022,  TP Group acquired a shareholding and Holbox Air was lounched.
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: '2vh',
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: 'black',
                        fontWeight: '500',
                    }}>
                        Nowadays
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5vh',
                    }}>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            We are a company based in Cancun international airport committed to giving the customer the best air transportation experience.
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            Our company has a valid air-taxi permit issued by "Secretaria de Comunicaciones y transportes SCT" ensuring the following
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            -Aircraft Insurance <br />
                            -Preventive maintenance <br />
                            -Safety Procedures <br />
                            -Pilots training providing a safety flight.                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}