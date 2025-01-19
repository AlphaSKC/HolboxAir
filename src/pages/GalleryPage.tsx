import { Box, useMediaQuery } from "@mui/material";
import GalleryDesktop from "../components/gallery/GalleryDesktop";
import GalleryMobile from "../components/gallery/GalleryMobile";

export default function GalleryPage() {

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