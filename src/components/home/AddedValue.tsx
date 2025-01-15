import { Box, Grid2, Typography } from "@mui/material";
import { Image } from "@nextui-org/react";

import FlightTime from '../../assets/img/FlightTime.png'
import NoHiddenFees from '../../assets/img/NoHiddenFees.png'
import Safe from '../../assets/img/Safe.png'
import RoadblockFree from '../../assets/img/RoadblockFree.png'


const AddedValues = [
    {
        id: 1,
        img: FlightTime,
        title: "Flight Time",
    },
    {
        id: 2,
        img: NoHiddenFees,
        title: "The price provided based on your requirements will be the final price.",
    },
    {
        id: 3,
        img: Safe,
        title: "Safe",
    },
    {
        id: 4,
        img: RoadblockFree,
        title: "Roadblock free",
    }
]

export default function AddedValue() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
        }}>
            <Grid2 container spacing={1} sx={{
                width: '70%',
                minHeight: '45vh',
                height: '100%',
                alignItems: 'center',
            }}>
                {AddedValues.map((value) => (
                    <Grid2 size={{ xs: 12, md: 6 }} sx={{
                        width: '100%',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image src={value.img} alt="Image" removeWrapper style={{
                                width: '40%',
                                height: '40%',
                            }} />
                            <Typography className="Lato" sx={{
                                fontSize: '3vh',
                                color: 'black',
                                fontWeight: '300'
                            }}>
                                {value.title}
                            </Typography>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}