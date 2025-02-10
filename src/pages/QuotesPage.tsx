import { Box, Typography } from "@mui/material";

export default function QuotesPage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "green",
        }}>
            <Typography>
                Quotes
            </Typography>
        </Box>
    )
}