import { Box, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import imgBg from '../../assets/img/slider/Fly.jpg';

export default function SideLeft() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "30vh",
            height: "100%",
            background: `url(${imgBg})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
                background: "rgba(230, 138, 0, 0.9)",
                width: "fit-content",
                borderRadius: "10px",
                border: "1px solid #ddd",
                padding: "10px",
            }}>
                <Typography className="Oswald" sx={{
                    fontSize: "1.2rem",
                    color: "white",
                    fontWeight: '700',
                }}>
                    Here you can:
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                }}>
                    <Typography className="Lato" sx={{
                        fontSize: "1rem",
                        color: "white",
                    }}>
                        <CheckCircleIcon sx={{ marginRight: '0.3vw' }} />
                        See the status of your quote
                    </Typography>
                    <Typography className="Lato" sx={{
                        fontSize: "1rem",
                        color: "white",
                    }}>
                        <CheckCircleIcon sx={{ marginRight: '0.3vw' }} />
                        See your trips
                    </Typography>
                    <Typography className="Lato" sx={{
                        fontSize: "1rem",
                        color: "white",
                    }}>
                        <CheckCircleIcon sx={{ marginRight: '0.3vw' }} />
                        See your reservations
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}