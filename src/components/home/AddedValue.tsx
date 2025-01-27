import { Box, Grid2, Typography } from "@mui/material";
import { Image } from "@nextui-org/react";

import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

const AddedValues = [
    {
        id: 1,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fa4a143e68be24aa5926ef3752960db2e&methods=resize%2C600%2C5000',
        title: "Flight Time",
    },
    {
        id: 2,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F99d6a15055ce4da5ad37b9ede0e6b8a9&methods=resize%2C600%2C5000',
        title: "The price provided based on your requirements will be the final price.",
    },
    {
        id: 3,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F59a09084bdef4c7b9d44ff65643137e6&methods=resize%2C600%2C5000',
        title: "Safe",
    },
    {
        id: 4,
        img: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F5524bea8955f494eb2399520a12b8ff5&methods=resize%2C600%2C5000',
        title: "Roadblock free",
    }
]

export default function AddedValue() {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
        }}
            data-aos="fade-left"
        >
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