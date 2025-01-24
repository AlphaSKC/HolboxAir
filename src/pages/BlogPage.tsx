import { Box } from "@mui/material";
import Posts from "../components/blog/Posts";

export default function BlogPage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <Posts />
        </Box>
    );
}