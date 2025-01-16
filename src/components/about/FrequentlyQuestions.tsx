import { Box, Grid2, Typography } from "@mui/material";

export default function FrequentlyQuestions() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginY: '3vh',
        }}>
            <Grid2 container sx={{ width: '70%', boxShadow: '0 0 10px #ccc' }}>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    padding: '1rem 2rem',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    gap: '2vh',
                    backgroundColor: '#f2f2f2',
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: 'black',
                        fontWeight: '500',
                    }}>
                        How to get to Isla Holbox?
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5vh',
                    }}>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            Most travelers reach Cancun first, as it's a major gateway to the region. You can fly directly to Cancun International Airport (CUN) from various international destinations. After that there are two options.
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            1. From Cancun, you'll need to make your way to the small coastal town of Chiquila. This is the departure point for ferries to Isla Holbox. You can get to Chiquila by car (rental or private transfer), bus, or shuttle service.
                            Once in Chiquila, you'll take a ferry to Isla Holbox. Ferries run regularly throughout the day. Travel time 03:00 hrs.
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                            2. Flying.
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    padding: '1rem 2rem',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    gap: '2vh',
                    backgroundColor: '#e68a00',
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: 'white',
                        fontWeight: '500',
                    }}>
                        Can I fly from Cancun to Holbox direct?
                    </Typography>
                    <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'white', textAlign: 'justify' }}>
                        Most travelers reach Cancun first, as it's a major gateway to the region. You can fly directly to Cancun International Airport (CUN) from various international destinations. After that there are two options.
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    padding: '1rem 2rem',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    gap: '2vh',
                    backgroundColor: { xs: '#f2f2f2', md: '#e68a00' },
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: { xs: 'black', md: 'white' },
                        fontWeight: '500',
                    }}>
                        Why choose Holbox Air?
                    </Typography>
                    <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: { xs: 'black', md: 'white' }, textAlign: 'justify' }}>
                        Holbox air is a flight charter company, operating flights from Cancun international airport to Holbox. We comply with current federal regulations, our planes and pilots are authorized by aeronautical authorities (SCT, AFAC). Flying with a reputable airtaxi such as Holbox Air can also provide a safe and comfortable experience, with well-maintained aircraft and highly trained pilots. Holbox Air also offers a variety of package options and other services to make your trip to Holbox as seamless and enjoyable as possible.
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    padding: '1rem 2rem',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    gap: '2vh',
                    backgroundColor: { xs: '#e68a00', md: '#f2f2f2' },
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: { xs: 'white', md: 'black' },
                        fontWeight: '500',
                    }}>
                        What things should I consider bringing to Holbox?
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5vh',
                    }}>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: { xs: 'white', md: 'black' }, textAlign: 'justify' }}>
                            -Sunscreen <br />
                            -Sunglasses <br />
                            -Mosquito repellent <br />
                            -Tequila! <br />
                            -Lots of energy <br />
                        </Typography>
                        <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: { xs: 'white', md: 'black' }, textAlign: 'justify' }}>
                            Note: In case you bring tequila, please keep it out of reach of the pilot :)
                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}