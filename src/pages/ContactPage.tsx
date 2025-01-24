import { Box } from "@mui/material";
import ContactForm from "../components/contact/ContactForm";
import { useEffect } from "react";

export default function ContactPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <ContactForm />
        </Box>
    );
}