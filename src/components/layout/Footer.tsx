import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: "#333", color: "white", padding: "20px 0" }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Sección de enlaces */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box>
                            <Link href="/" color="inherit" display="block">
                                Home
                            </Link>
                            <Link href="/about" color="inherit" display="block">
                                About
                            </Link>
                            <Link href="/contact" color="inherit" display="block">
                                Contact
                            </Link>
                            <Link href="/blog" color="inherit" display="block">
                                Blog
                            </Link>
                        </Box>
                    </Grid>

                    {/* Sección de redes sociales */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box>
                            <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
                                <Facebook />
                            </Link>
                            <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
                                <Instagram />
                            </Link>
                            <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
                                <Twitter />
                            </Link>
                            <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
                                <LinkedIn />
                            </Link>
                        </Box>
                    </Grid>

                    {/* Sección de derechos de autor */}
                    <Grid item xs={12} sm={12} md={3}>
                        <Typography variant="body2" align="center">
                            &copy; {new Date().getFullYear()} Holbox Air. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
