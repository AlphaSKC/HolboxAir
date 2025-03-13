import { Box, Typography } from "@mui/material";

export default function TermsOfUse() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Typography variant="h4" sx={{ mt: 2 }}>Términos de uso</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, eros nec luctus ultricies, nisl nunc tincidunt risus, nec vestibulum libero odio nec orci. Nulla facilisi. Nullam nec ligula nec elit scelerisque congue. Nullam auctor, eros nec luctus ultricies, nisl nunc tincidunt risus, nec vestibulum libero odio nec orci. Nulla facilisi. Nullam nec ligula nec elit scelerisque congue.
            </Typography>
        </Box>
    );
}