import { Box, Grid2, Typography } from "@mui/material";

import WhereHolbox from '../../assets/img/others/WhereHolbox.jpg';

const Texts = [
    {
        text: `Holbox “black hole” in Maya it is a tropical island located within the Nature Reserve of Yum Balam 75 km (47 miles) northwest of the Cancun airport, in front of chiquila port. Its population is approximately 2,200. There are no paved roads, only sand paths. If you're flying from the US or Canada, look down maybe you can see it.`
    },
    {
        text: `Punta Coco is located on the west side where bioluminescence can be observed on dark nights between April and November.`
    },
    {
        text: `On the other hand is Punta Mosquito located on the east side of the island where you can walk in the middle of the sea on the sandbank.`
    }
]

export default function WhereLocated() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop:'3vh',
        }}>
            <Grid2 container spacing={3} sx={{ width: '70%', padding: '2vh', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px #d4d4d4' }}>
                <Grid2 size={{ xs: 12, md: 7 }} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    gap: '2vh',
                }}>
                    <Typography className="Oswald" sx={{
                        fontSize: '3.5vh',
                        color: 'black',
                        fontWeight: '500',
                    }}>
                        Where is Holbox Located?
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5vh',
                    }}>
                        {Texts.map((text, index) => (
                            <Typography key={index} className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                                {text.text}
                            </Typography>
                        ))}
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 5 }}>
                    <img src={WhereHolbox} alt="Where Holbox" style={{ width: '100%', height: '100%', borderRadius:'5px' }} />
                </Grid2>
            </Grid2>
        </Box>
    );
}