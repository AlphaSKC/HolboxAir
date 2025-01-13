import { Box, Grid2, Typography, Button } from "@mui/material";
import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

import Holbox from '../../assets/img/Holbox24Hrs.jpg'
import Cancun from '../../assets/img/CancunOverflight.jpg'
import CancunAirport from '../../assets/img/CancunAirport.jpg'

const Services = [
    {
        id: 1,
        img: Cancun,
        title: "Cancun Overflight",
        price: 200
    },
    {
        id: 2,
        img: Holbox,
        title: "Holbox 24 hrs",
        price: 480
    },
    {
        id: 3,
        img: CancunAirport,
        title: "Stay at cancun Airport",
        price: 0
    }
]

export default function ExtraServices() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            marginTop: '2rem',
            // backgroundColor: 'green'
        }}>
            <Typography sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'black',
            }}>
                Extra Services
            </Typography>
            <Grid2 container spacing={2} sx={{ marginY: '1rem' }}>
                {Services.map((service) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={service.id} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <Card key={service.id} isFooterBlurred className="col-span-12 sm:col-span-4" style={{
                            height: '50vh',
                            width: '100%',
                        }} onPress={() => console.log("item pressed")}>
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start" style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                width: '100%',
                                borderRadius: '1rem'
                            }}>
                                <Typography className="text-white font-bold" sx={{ fontSize: '1.2rem' }}>
                                    {service.title}
                                </Typography>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card background"
                                className="z-0 w-full h-full object-cover"
                                src={service.img}
                            />
                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                <Box>
                                    <Typography sx={{
                                        color: 'black',
                                        fontSize: '1rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {service.price === 0 ? "Contact Us" : "$"+ service.price + " USD"}
                                    </Typography>
                                </Box>
                                <Button sx={{
                                    backgroundColor: '#e68a00',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '50px',
                                    textTransform: 'none',
                                    ":hover": { backgroundColor: 'white', color: '#e68a00' }
                                }}>
                                    See more 
                                </Button>
                            </CardFooter>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}