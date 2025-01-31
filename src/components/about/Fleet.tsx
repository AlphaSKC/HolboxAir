import { Box, Grid2, Typography } from "@mui/material";

import Fleet1 from '../../assets/img/fleet/Cessna-182.jpg';
import Fleet2 from '../../assets/img/fleet/Seneca.jpg';
import Fleet3 from '../../assets/img/fleet/Kodiak.jpg';
import Fancybox from "../../utils/Fancybox";

const Fleets = [
    {
        id: 1,
        img: Fleet1,
        title: "Cessna 182",
    },
    {
        id: 2,
        img: Fleet2,
        title: "Seneca",
    },
    {
        id: 3,
        img: Fleet3,
        title: "Kodiak",
    }
]

export default function Fleet() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginY: '3vh',
            gap: '1.2vh',
        }}>
            <Typography className="Oswald" sx={{
                fontSize: '3.5vh',
                color: 'black',
                fontWeight: '500',
            }}>
                Fleet
            </Typography>
            <Box sx={{
                width: {xs:'90%', md:'60%'}, justifyContent: 'center'
            }}>
                <Fancybox>
                    <Grid2 container spacing={4} sx={{ justifyContent: 'center' }}>
                        {Fleets.map((fleet) => (
                            <Grid2 key={fleet.id} size={{ xs: 6, md: 4 }}>
                                <a data-fancybox="gallery" href={fleet.img}>
                                    <img src={fleet.img} alt={fleet.title} className="image-hover-effect" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                </a>
                            </Grid2>
                        ))}
                    </Grid2>
                </Fancybox>
            </Box>
        </Box >
    );
}