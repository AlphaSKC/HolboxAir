import { Box, Button, Grid2, Typography } from "@mui/material";
import img404 from "../assets/img/others/404.png";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{ minHeight: "50vh", marginBottom: '3vh' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center', height: '70vh' }}>
                    <img src={img404} alt="Error" />
                </Grid2>
                <Grid2 size={12}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography className="Lato" sx={{ fontSize: '4vh', fontWeight: '700', color: '#e68a00' }}>
                            Oops! We can't find the page
                        </Typography>
                        <NavLink to="/" style={{ textDecoration: 'none' }}>
                            <Button className="Lato" sx={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#e68a00',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: '700',
                                fontSize: '2.2vh',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: '#e68a00'
                                }
                            }}>
                                Go to home                            </Button>
                        </NavLink>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}