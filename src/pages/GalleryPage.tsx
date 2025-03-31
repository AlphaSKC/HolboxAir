import { Box, useMediaQuery } from "@mui/material";
import GalleryDesktop from "../components/gallery/GalleryDesktop";
import GalleryMobile from "../components/gallery/GalleryMobile";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function GalleryPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <>
            <Helmet>
                <title>Holbox Air: Gallery</title>
                <meta name="description" content="Explore our gallery and discover the beauty of Holbox Island and its surroundings." />
                <meta name="keywords" content="gallery, Holbox Island, photography, nature" />
                <meta name="author" content="Holbox Air" />
                <link rel="canonical" href="https://holboxair.com/gallery" />
                <meta name="og:title" content="Gallery | Holbox Air" />
                <meta name="og:description" content="Explore our gallery and discover the beauty of Holbox Island and its surroundings." />
                <meta name="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
                <meta name="og:url" content="https://holboxair.com/gallery" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content="Holbox Air" />
            </Helmet>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}>
                {isMobile ?
                    <GalleryMobile /> :
                    <GalleryDesktop />
                }
            </ Box>
        </>
    );
}