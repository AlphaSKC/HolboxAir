import { Box, useMediaQuery } from "@mui/material";
import GalleryDesktop from "../components/gallery/GalleryDesktop";
import GalleryMobile from "../components/gallery/GalleryMobile";
import { useEffect } from "react";

export default function GalleryPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
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
    );
}