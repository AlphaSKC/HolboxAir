import { Box } from "@mui/material";

import img1 from "../../assets/img/gallery/Gallery1.jpg";
import img2 from "../../assets/img/gallery/Gallery2.jpg";
import img3 from "../../assets/img/gallery/Gallery3.jpg";
import img4 from "../../assets/img/gallery/Gallery4.jpg";
import img5 from "../../assets/img/gallery/Gallery5.jpg";
import img6 from "../../assets/img/gallery/Gallery6.jpg";
import img7 from "../../assets/img/gallery/Gallery7.jpg";
import img8 from "../../assets/img/gallery/Gallery8.jpg";
import img9 from "../../assets/img/gallery/Gallery9.jpg";
import img10 from "../../assets/img/gallery/Gallery10.jpg";
import img11 from "../../assets/img/gallery/Gallery11.jpg";
import img12 from "../../assets/img/gallery/Gallery12.jpg";
import img13 from "../../assets/img/gallery/Gallery13.jpg";
import img14 from "../../assets/img/gallery/Gallery14.jpg";
import img15 from "../../assets/img/gallery/Gallery15.jpg";
import Fancybox from "../../utils/Fancybox";

const images = [
    {
        id: 1,
        img: img1,
        title: "Transfer Holbox",
    },
    {
        id: 2,
        img: img4,
        title: "Holbox Sea",
    },
    {
        id: 3,
        img: img3,
        title: "Holbox Flight",
    },
    {
        id: 4,
        img: img2,
        title: "Holbox 4",
    },
    {
        id: 5,
        img: img5,
        title: "Holbox 5",
    },
    {
        id: 6,
        img: img6,
        title: "Holbox 6",
    },
    {
        id: 7,
        img: img7,
        title: "Holbox 7",
    },
    {
        id: 8,
        img: img8,
        title: "Holbox 8",
    },
    {
        id: 9,
        img: img9,
        title: "Holbox 9",
    },
    {
        id: 10,
        img: img10,
        title: "Holbox 10",
    },
    {
        id: 11,
        img: img11,
        title: "Holbox 11",
    },
    {
        id: 12,
        img: img12,
        title: "Holbox 12",
    },
    {
        id: 13,
        img: img15,
        title: "Holbox 13",
    },
    {
        id: 14,
        img: img14,
        title: "Holbox 14",
    },
    {
        id: 15,
        img: img13,
        title: "Holbox 15",
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
                                    aria-label={item.title}
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