import { Box } from "@mui/material";
import PromotionsCodeList from "../components/admin/promotions/PromotionsCodeList";

export default function PromotionsCodePage() {
    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            bgcolor: "#F3F4F9",
            padding: {
                xs: "100px 20px 100px 80px",
                sm: "100px 40px 100px 100px",
                md: "100px 40px 100px 100px",
                lg: "100px",
            },
            width: "100%",
            boxSizing: "border-box",
        }}>
            <PromotionsCodeList />
        </Box>
    )
}