import { Box, Grid2, Typography } from "@mui/material";

import Fleet1 from '../../assets/img/Cessna-182.jpg';
import Fleet2 from '../../assets/img/Seneca.jpg';
import Fleet3 from '../../assets/img/Kodiak.jpg';

export default function Fleet() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: '3vh',
            gap: '1.2vh',
        }}>
            <Typography className="Oswald" sx={{
                fontSize: '3.5vh',
                color: 'black',
                fontWeight: '500',
            }}>
                Fleet
            </Typography>
            <Grid2 container spacing={4} sx={{ width: '60%' }}>
                <Grid2 size={{ xs: 6, md: 4 }}>
                    <img src={Fleet1} alt="Cessna 182" className="image-hover-effect" style={{ width: '100%', height: '100%' }} />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }}>
                    <img src={Fleet2} alt="Seneca" className="image-hover-effect" style={{ width: '100%', height: '100%' }} />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }}>
                    <img src={Fleet3} alt="Kodiak" className="image-hover-effect" style={{ width: '100%', height: '100%' }} />
                </Grid2>
            </Grid2>
        </Box >
    );
}