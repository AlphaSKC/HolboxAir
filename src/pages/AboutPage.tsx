import { Box } from "@mui/material";
import WhereLocated from "../components/about/WhereLocated";
import FrequentlyQuestions from "../components/about/FrequentlyQuestions";
import HistoryNowadays from "../components/about/HistoryNowadays";
import Fleet from "../components/about/Fleet";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function AboutPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Helmet>
                <title>Holbox Air: About</title>
                <meta name="title" content="About Us | Holbox Air" />
                <meta name="description" content="We are a company based in Cancun international airport committed to giving the customer the best air transportation experience." />
                <meta name="keywords" content="about us, company history, fleet" />
                <meta name="author" content="Holbox Air" />
                <link rel="canonical" href="https://holboxair.com/about" />
                <meta property="og:title" content="About Us | Holbox Air" />
                <meta property="og:description" content="We are a company based in Cancun international airport committed to giving the customer the best air transportation experience." />
                <meta property="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
                <meta property="og:url" content="https://holboxair.com/about" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Holbox Air" />
            </Helmet>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}>
                <HistoryNowadays />
                <Fleet />
                <WhereLocated />
                <FrequentlyQuestions />
            </Box>
        </>
    );
}