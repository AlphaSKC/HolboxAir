import { Box } from "@mui/material";
import Posts from "../components/blog/Posts";
import { useEffect } from "react";

export default function BlogPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            overflowX: 'hidden',
        }}>
            <Posts />
        </Box>
    );
}