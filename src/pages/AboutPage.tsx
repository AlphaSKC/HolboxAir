import { Box } from "@mui/material";
import WhereLocated from "../components/about/WhereLocated";
import FrequentlyQuestions from "../components/about/FrequentlyQuestions";
import HistoryNowadays from "../components/about/HistoryNowadays";
import Fleet from "../components/about/Fleet";
import { useEffect } from "react";

export default function AboutPage() {

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

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