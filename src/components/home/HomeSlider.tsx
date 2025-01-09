import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import styles from '../../assets/css/slider.module.css'

import img1 from '../../assets/img/Holbox1.jpg'
import img2 from '../../assets/img/Holbox2.jpg'
import img3 from '../../assets/img/Holbox3.jpg'
import img4 from '../../assets/img/Holbox4.jpg'
import img5 from '../../assets/img/Holbox5.jpg'

const slides = [
    {
        id: 1,
        img: img1,
        title: "Less time on the road",
    },
    {
        id: 2,
        img: img2,
        title: "More time in Holbox",
    },
    {
        id: 3,
        img: img3,
        title: "Holbox dream"
    },
    {
        id: 4,
        img: img4,
        title: "Explore"
    },
    {
        id: 5,
        img: img5,
        title: "Discover"
    }
]

export default function HomeSlider() {
    return (
        <Box position={"relative"}>
            <Swiper
                spaceBetween={5}
                effect={'fade'}
                pagination={{
                    clickable: true,
                    el: "#pagination",
                    type: 'bullets',
                    dynamicBullets: true,
                    bulletClass: `${styles.bulletSliderHome}`,
                    bulletActiveClass: `${styles.bulletSliderHomeActive}`,
                }}
                loop={true}
                modules={[Pagination, Autoplay, EffectFade]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className={`mySwiper ${styles.sliderHome}`}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="p-relative" style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <Typography className="Oswald" sx={{
                            color: "#fff",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 1,
                            textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                            bottom: { xs: "14%", sm: "20%" },
                            textAlign: "center",
                            fontSize: { xs: "2.5rem", sm: "3.5rem" },
                        }}>
                            {slide.title}
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Box id="pagination" className={`${styles.containerBullet}`} />
        </Box>
    );
}