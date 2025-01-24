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
                background: "rgba(230, 138, 0, 0.8)",
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
                    Aqui puedes:
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
                        <CheckCircleIcon sx={{marginRight:'0.3vw'}}/>
                        Ver el estado de tu cotización
                    </Typography>
                    <Typography className="Lato" sx={{
                        fontSize: "1rem",
                        color: "white",
                    }}>
                        <CheckCircleIcon sx={{marginRight:'0.3vw'}}/>
                        Ver tus viajes
                    </Typography>
                    <Typography className="Lato" sx={{
                        fontSize: "1rem",
                        color: "white",
                    }}>
                        <CheckCircleIcon sx={{marginRight:'0.3vw'}}/>
                        Ver tus reservas
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}