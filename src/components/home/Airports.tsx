import { Box, Button, Typography } from "@mui/material";
// import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import styles from "../../assets/css/slider.module.css";

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import Holbox from '../../assets/img/Holbox24Hrs.jpg'
// import Cancun from '../../assets/img/CancunOverflight.jpg'
// import CancunAirport from '../../assets/img/CancunAirport.jpg'

// const Services = [
//     {
//         id: 1,
//         img: Cancun,
//         title: "Cancun Overflight",
//         price: 200
//     },
//     {
//         id: 2,
//         img: Holbox,
//         title: "Holbox 24 hrs",
//         price: 480
//     },
//     {
//         id: 3,
//         img: CancunAirport,
//         title: "Stay at Cancun Airport",
//         price: 0
//     }
// ]

export default function Airports() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginBottom: '2rem',
            justifyContent: 'center',
            background: 'blue'
        }}>
            <Typography className="Oswald" sx={{
                fontSize: '4vh',
                color: 'black',
                fontWeight: 'bold',
            }}>
                Find out some departing points.
            </Typography>
            {/* <div className={styles.nextAirport}>
                <ArrowForwardIosIcon />
            </div>
            <div className={styles.prevAirport}>
                <ArrowBackIosNewIcon />
            </div> */}
            {/* <Swiper
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                navigation={{ nextEl: `.${styles.nextAirport}`, prevEl: `.${styles.prevAirport}` }}
                modules={[Navigation]}
            >
                {Services.map((service) => (
                    <SwiperSlide>
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
                    </SwiperSlide>
                ))}
            </Swiper> */}
        </Box>
    );
}