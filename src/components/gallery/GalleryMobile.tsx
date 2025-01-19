import { Box } from "@mui/material";

import img1 from "../../assets/img/Holbox1.jpg";
import img2 from "../../assets/img/Holbox2.jpg";
import img3 from "../../assets/img/Holbox3.jpg";
import img4 from "../../assets/img/Holbox4.jpg";
import img5 from "../../assets/img/Holbox5.jpg";
import Fancybox from "../../utils/Fancybox";


const images = [
    {
        id: 1,
        img: img1,
        title: "Holbox 1",
    },
    {
        id: 2,
        img: img2,
        title: "Holbox 2",
    },
    {
        id: 3,
        img: img3,
        title: "Holbox 3",
    },
    {
        id: 4,
        img: img4,
        title: "Holbox 4",
    },
    {
        id: 5,
        img: img5,
        title: "Holbox 5",
    },
    {
        id: 6,
        img: img1,
        title: "Holbox 6",
    },
    {
        id: 7,
        img: img2,
        title: "Holbox 7",
    },
    {
        id: 8,
        img: img3,
        title: "Holbox 8",
    },
    {
        id: 9,
        img: img4,
        title: "Holbox 9",
    },
    {
        id: 10,
        img: img5,
        title: "Holbox 10",
    },
    {
        id: 11,
        img: img1,
        title: "Holbox 11",
    },
    {
        id: 12,
        img: img2,
        title: "Holbox 12",
    }
]

export default function GalleryMobile() {
    return (
        <Box paddingX={{ xs: 2, sm: 2, md: 10 }} paddingY={3}>
            <Fancybox
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}
            >
                <Box className="galleryMobile">
                    {images.map((item) => (
                        <Box className={'box' + item.id}>
                            <a data-fancybox="gallery" href={item.img}>
                                <img className="imgGallery"
                                    alt={item.title}
                                    src={item.img}
                                />
                            </a>
                        </Box>
                    ))}
                </Box>
            </Fancybox>
        </Box>
    );
}