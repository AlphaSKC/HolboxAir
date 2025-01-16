import { Box, Typography } from "@mui/material";

import Banner from '../../assets/img/Holbox-Sunset.jpg';

export default function Slogan() {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            paddingX: '12%',
            minHeight: '30vh',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
        }}>
            <Typography className="Shrikhand" sx={{
                color: 'white',
                textAlign: 'center',
                fontSize: '4vh',
            }}>
                "Less time on the road, more time in Holbox"
            </Typography>
        </Box>
    );
}