import { Box } from "@mui/material";
import ContactForm from "../components/contact/ContactForm";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function ContactPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Helmet>
                <title>Holbox Air: Contact</title>
                <meta name="description" content="Contact us for customer support, reservations request, suggestions and more." />
                <meta name="keywords" content="contact, customer support, reservations, suggestions" />
                <meta name="author" content="Holbox Air" />
                <link rel="canonical" href="https://holboxair.com/contact" />
                <meta name="og:title" content="Contact Us | Holbox Air" />
                <meta name="og:description" content="Contact us for customer support, reservations request, suggestions and more." />
                <meta name="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
                <meta name="og:url" content="https://holboxair.com/contact" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content="Holbox Air" />
            </Helmet>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ContactForm />
            </Box>
        </>
    );
}