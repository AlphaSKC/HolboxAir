import { Box, Typography } from "@mui/material";
// import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import 'swiper/modules';

import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

import { Card, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import AirportsData from "../../utils/AirportsData.json";

export default function Airports() {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
        }}
            data-aos="fade-right">
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
                        slidesPerView={"auto"}
                        spaceBetween={25}
                        centeredSlides={true}
                    >
                        {AirportsData.map((airport) => (
                            <SwiperSlide key={airport.id} className="swiperSlide">
                                <NavLink to={airport.route} onClick={() => window.scrollTo(0, 0)} preventScrollReset>
                                    <Card isFooterBlurred className="border-none" radius="lg">
                                        <Image
                                            removeWrapper
                                            alt={`Image of ${airport.name}`}
                                            className="z-0 object-cover"
                                            height="30vh"
                                            width="fit-content"
                                            src={airport.img}
                                        />
                                        <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                            <Typography className="Oswald" sx={{ fontSize: '3vh', textAlign: 'center' }}>
                                                {airport.name}
                                            </Typography>
                                        </CardFooter>
                                    </Card>
                                </NavLink>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="pagination" />
                </Box>
            </Box>
        </Box >
    );
}