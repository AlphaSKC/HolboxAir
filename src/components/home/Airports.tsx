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

const AirportsData = [
    {
        id: 1,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fa20ff6f21c424066ab91c8d80214f6ad&methods=resize%2C600%2C5000',
        name: 'Cancun FBO',
        route: '/airports/Cancun FBO',
    },
    {
        id: 2,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F9f5a3cb966d44935b1bc73951b903f30&methods=resize%2C600%2C5000',
        name: 'Holbox Airport',
        route: '/airports/Holbox Airport',
    },
    {
        id: 3,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fc600a75bbb6645aaa828b06cf911a465&methods=resize%2C600%2C5000',
        name: 'Playa del Carmen',
        route: '/airports/Playa del Carmen',
    },
    {
        id: 4,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F912babe8e87e4e758cea39cad46d63d2&methods=resize%2C600%2C5000',
        name: 'Tulum FBO',
        route: '/airports/Tulum FBO',
    },
    {
        id: 5,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/CZM11.jpg/320px-CZM11.jpg',
        name: 'Cozumel Airport',
        route: '/airports/Cozumel Airport',
    },
    {
        id: 6,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/M%C3%A9rida_International_Airport_%28Aeropuerto_Internacional_de_M%C3%A9rida_Manuel_Crescencio_Rej%C3%B3n%29_Feb_2021_-_01.jpg/330px-M%C3%A9rida_International_Airport_%28Aeropuerto_Internacional_de_M%C3%A9rida_Manuel_Crescencio_Rej%C3%B3n%29_Feb_2021_-_01.jpg',
        name: 'Merida Airport',
        route: '/airports/Merida Airport',
    }
]

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