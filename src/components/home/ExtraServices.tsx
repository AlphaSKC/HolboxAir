import { Box, Grid2, Typography, Button } from "@mui/material";
import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

const Services = [
    {
        id: 1,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F86c44bab247b4e6da0684588641b4ea1&methods=resize%2C600%2C5000',
        title: "Cancun Overflight",
        price: 200
    },
    {
        id: 2,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F03c68569f56a43aa8c635b7f553b1d88&methods=resize%2C600%2C5000',
        title: "Holbox 24 hrs",
        price: 480
    },
    {
        id: 3,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1613252086325-ac35531fc326%3Fcrop%3Dentropy%26cs%3Dtinysrgb%26fit%3Dmax%26fm%3Djpg%26ixid%3DM3w1NTEzfDB8MXxzZWFyY2h8NDN8fGJlZHxlbnwwfHx8fDE3MDA2MTc2MjR8MA%26ixlib%3Drb-4.0.3%26q%3D80%26w%3D600%26utm_source%3Dendurance-innovation%26utm_medium%3Dreferral',
        title: "Stay at Cancun Airport",
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
            marginY: '2rem',
            // backgroundColor: 'green'
        }}>
            <Typography className="Oswald" sx={{
                fontSize: '4vh',
                fontWeight: 'bold',
                color: 'black',
            }}>
                Extra Services
            </Typography>
            <Grid2 container spacing={2} sx={{ marginY: '1rem', justifyContent: 'center' }}>
                {Services.map((service) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={service.id} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '300px',
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
                                <Typography className="text-white font-bold Lato" sx={{ fontSize: '1.2rem' }}>
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
                                    <Typography className="Lato" sx={{
                                        color: 'black',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                    }}>
                                        {service.price === 0 ? "Contact Us" : "$" + service.price + " USD"}
                                    </Typography>
                                </Box>
                                <Button className="Lato" sx={{
                                    backgroundColor: '#e68a00',
                                    color: 'white',
                                    fontWeight: 'bold',
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