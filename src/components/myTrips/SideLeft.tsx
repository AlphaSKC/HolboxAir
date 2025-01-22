import { Box, Typography } from "@mui/material";

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
                background: "red",
                width: "50%",
                borderRadius: "10px",
                border: "1px solid #ddd",
                padding: "10px",
            }}>
                <Typography>
                    Aqui puedes
                </Typography>
                <Typography>
                    Aqui puedes
                </Typography>
                <Typography>
                    Aqui puedes
                </Typography>
                <Typography>
                    Aqui puedes
                </Typography>
            </Box>
        </Box>
    );
}