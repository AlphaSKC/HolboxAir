import { Box } from "@mui/material";
import WhereLocated from "../components/about/WhereLocated";
import FrequentlyQuestions from "../components/about/FrequentlyQuestions";
import HistoryNowadays from "../components/about/HistoryNowadays";
import Fleet from "../components/about/Fleet";

export default function AboutPage() {
    return (
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
    );
}