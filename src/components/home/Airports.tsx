import { Box, Typography } from "@mui/material";
// import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Holbox from '../../assets/img/extraServices/Holbox24Hrs.jpg'
import Cancun from '../../assets/img/extraServices/CancunOverflight.jpg'
import CancunAirport from '../../assets/img/extraServices/CancunAirport.jpg'
import { Card, CardFooter, Image } from "@nextui-org/react";

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
        title: "Stay at Cancun Airport",
        price: 0
    },
    {
        id: 4,
        img: Cancun,
        title: "Cancun Overflight",
        price: 200
    },
    {
        id: 5,
        img: Holbox,
        title: "Holbox 24 hrs",
        price: 480
    },
    {
        id: 6,
        img: CancunAirport,
        title: "Stay at Cancun Airport",
        price: 0
    }
]

export default function Airports() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
        }}>
            <Typography className="Oswald" sx={{
                fontSize: '4vh',
                color: 'black',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                Find out some departing points.
            </Typography>
            <Box className="container">
                <Box className="swiperContainer" position={"relative"}>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true
                        }}
                        pagination={{
                            el: ".pagination",
                            clickable: true,
                        }}
                        loop={true}
                        slidesPerView="auto"
                        spaceBetween={25}
                    >
                        {Services.map((service) => (
                            <SwiperSlide key={service.id} className="swiperSlide">
                                <Card isPressable isFooterBlurred className="border-none card" radius="lg">
                                    {/* <CardHeader className="absolute z-10 flex-col !items-center" style={{
                                        background:'rgba(255,255,255,0.8)',
                                        padding: '1rem',
                                        width:'justify-content',
                                        top: "15vh",
                                        borderRadius: '1rem',
                                    }}>
                                        <Typography>
                                            dsgajdka
                                        </Typography>
                                    </CardHeader> */}
                                    <Image
                                        removeWrapper
                                        alt={service.title}
                                        className="z-0 w-full h-full object-cover"
                                        height="40vh"
                                        src={service.img}
                                        width="20vw"
                                    />
                                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                        <Typography>
                                            {service.title}
                                        </Typography>

                                    </CardFooter>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="pagination" />
                </Box>
            </Box>
        </Box>
    );
}