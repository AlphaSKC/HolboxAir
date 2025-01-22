import { Box, Grid2, Typography } from "@mui/material";

import Banner from '../../assets/img/others/Banner2.jpg';
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

export default function ImageDivider() {
    
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Box sx={{
            width: '100%',
            justifyContent: 'center',
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <Grid2 container spacing={2} sx={{
                minHeight: '45vh',
                height: '100%',
                paddingY: '3rem',
                paddingX: '12%',
                alignItems: 'center',
            }}
            data-aos="zoom-out-up"
            >
                <Grid2 size={{xs:12, md:6}}>
                    <Typography className="Shrikhand" sx={{
                        color: 'white',
                        textAlign: 'start',
                        fontSize: '7.5vh',
                    }}>
                        See you in Holbox this Year!
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
}