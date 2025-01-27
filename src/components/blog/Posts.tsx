import { Box, Pagination, Stack, styled, Typography } from "@mui/material";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

const StyledPagination = styled(Pagination)(() => ({
    "& .MuiPaginationItem-root": {
        fontFamily: "Lato",
        borderRadius: "10px",
        color: "#717171",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "#E68A00",
        color: "white",
    },
}))

const posts = [
    {
        id: 1,
        title: "How much luggage I can bring onboard?",
        date: "24 de Enero de 2025",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, ligula eget porttitor volutpat, est nulla egestas odio, nec aliquet justo metus sed nisi.",
    },
    {
        id: 2,
        title: "Rain in my flight to Holbox!",
        date: "24 de Enero de 2025",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, ligula eget porttitor volutpat, est nulla egestas odio, nec aliquet justo metus sed nisi.",
    },
    {
        id: 3,
        title: "Average weather",
        date: "24 de Enero de 2025",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, ligula eget porttitor volutpat, est nulla egestas odio, nec aliquet justo metus sed nisi.",
    },
    {
        id: 4,
        title: "Whale Shark",
        date: "24 de Enero de 2025",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, ligula eget porttitor volutpat, est nulla egestas odio, nec aliquet justo metus sed nisi.",
    },
    {
        id: 5,
        title: "How much luggage I can bring onboard?",
        date: "24 de Enero de 2025",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, ligula eget porttitor volutpat, est nulla egestas odio, nec aliquet justo metus sed nisi.",
    }
]


export default function Posts() {

    useEffect(() => {
        AOS.init();
    }, []);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const handleChange = (_event: any, value: any) => {
        setPage(value);
    };

    const numberOfPages = posts
        ? Math.ceil(posts.length / itemsPerPage)
        : 0;
    const displayedCategories = posts
        ? posts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: '3vh',
            gap: '3vh',
        }}>
            {displayedCategories.map((post) => (
                <Card
                    key={post.id}
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                    shadow="sm"
                    data-aos={post.id % 2 === 0 ? "fade-left" : "fade-right"}
                    style={{
                        width: '85%',
                    }}
                >
                    <CardBody>
                        <Box className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                            <Box className="relative col-span-6 md:col-span-4">
                                <Image
                                    alt="Album cover"
                                    className="object-cover"
                                    height={200}
                                    shadow="md"
                                    src="https://heroui.com/images/album-cover.png"
                                    width="100%"
                                />
                            </Box>
                            <Box className="flex flex-col col-span-6 md:col-span-8">
                                <Typography className="Oswald" sx={{ fontSize: '2.3vh', fontWeight: '300', color: '#e68a00', textTransform: 'uppercase' }}>
                                    {post.date}
                                </Typography>
                                <Typography sx={{ fontSize: '3.5vh', fontWeight: '700', color: '#000' }} className="Lato">
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" className="text-justify Lato">
                                    {post.content}
                                </Typography>
                            </Box>
                        </Box>
                    </CardBody>
                </Card>
            ))}

            <Stack spacing={2}>
                <StyledPagination
                    count={numberOfPages}
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
        </Box>
    );
}