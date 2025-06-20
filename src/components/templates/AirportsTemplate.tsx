import { Box, Typography, useMediaQuery } from "@mui/material";
import Fancybox from "../../utils/Fancybox";
import { useParams } from "react-router-dom";
import Airports from '../../utils/AirportsData.json';
import Map from "../general/Map";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function AirportsTemplate() {
    const { name } = useParams<{ name: string }>();

    const isMobile = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        AOS.init();
    }, []);

    const airport = Airports.find((airport) => airport.route === "/airports/" + name);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowX: 'hidden',
        }}>
            {airport && (
                <>
                    <Helmet>
                        <title>{`Holbox Air: ${airport.name}`}</title>
                        <meta name="description" content={airport.content || "Discover more about this airport."} />
                        <meta name="keywords" content={`${airport.name}, airport, Holbox Air`} />
                        <meta name="author" content="Holbox Air" />
                        <link rel="canonical" href={`https://holboxair.com/airports/${name}`} />
                        <meta property="og:title" content={`${airport.name} | Holbox Air`} />
                        <meta property="og:description" content={airport.content || "Discover more about this airport."} />
                        <meta property="og:image" content={airport.gallery[0]} />
                        <meta property="og:url" content={`https://holboxair.com/airports/${name}`} />
                        <meta property="og:type" content="website" />
                        <meta property="og:site_name" content="Holbox Air" />
                    </Helmet>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <Box sx={{
                            bgcolor: '#F5F5F5',
                            py: '5vh',
                            px: '15vw',
                            width: '100%',
                            height: 'auto',
                        }}>
                            <Typography variant="h4" component="h1" gutterBottom className="Lato" width='100%'>
                                {airport.name}
                            </Typography>
                            <Fancybox
                                options={{
                                    Carousel: {
                                        infinite: false,
                                    }
                                }}
                            >
                                <Box sx={{ mt: 2, width: '100%', height: '45vh', overflow: 'hidden' }} className={isMobile ? "parentMobile" : "parentWeb"}>
                                    {airport.gallery.map((imgUrl, index) => (
                                        <Box key={index} className={isMobile ? `airport${index + 1}Mobile` : `airport${index + 1}Web`} data-aos="fade-up">
                                            <a data-fancybox="gallery" href={imgUrl}>
                                                <img className="imgGallery"
                                                    alt={`${airport.name} ${index + 1}`}
                                                    src={imgUrl}
                                                    loading="lazy"
                                                />
                                            </a>
                                        </Box>
                                    ))}
                                </Box>
                            </Fancybox>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: '60%',
                            my: '5vh',
                        }}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                className="Lato"
                                dangerouslySetInnerHTML={{ __html: airport.content || "" }}
                                sx={{ mt: 2 }}
                            />
                        </Box>
                        <Map lat={airport.lat} lng={airport.lng} />
                    </Box>
                </>
            )}
        </Box>
    );
} 