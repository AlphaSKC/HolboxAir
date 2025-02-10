import { Box, Typography } from "@mui/material";

export default function DealsPage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "yellow",
        }}>
            <Typography>
                Deals
            </Typography>
        </Box>
    )
}