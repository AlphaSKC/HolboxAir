import { Box } from "@mui/material";
import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // minHeight: "100vh",
            // backgroundColor: "red",
        }}>
            <ContactForm />
        </Box>
    );
}