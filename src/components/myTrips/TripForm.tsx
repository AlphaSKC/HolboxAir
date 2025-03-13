import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Input, Tooltip } from "@nextui-org/react";
import FlightIcon from '@mui/icons-material/Flight';
import HelpIcon from '@mui/icons-material/Help';
import { useState } from "react";
import { GetFlight } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

export default function TripForm() {
    const navigate = useNavigate();

    const [apellido, setApellido] = useState('');
    const [tripCode, setTripCode] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setErrorMessage('');
        const data = {
            apellido: apellido,
            codigo: tripCode
        }
        try {
            const response = await GetFlight(data);
            if (response.success) {
                localStorage.setItem('myTripCompleted', 'true');
                navigate("/myTrips/flightDetail", { state: response.result });
            }
            else {
                throw new Error('Flight not found');
            }
        }
        catch (error) {
            setErrorMessage('Flight not found. Please check your trip code and lastname.');
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            height: { xs: "fit-content", md: "60vh" },
            py: { xs: "20px", md: "40px" },
            width: "100%",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: { xs: "90%", md: "80%" },
                height: "100%",
                paddingLeft: "60px",
                gap: "20px",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography className="Lato" sx={{
                        fontSize: "1.1rem",
                        color: "black",
                        fontWeight: '700'
                    }}>
                        Manage your trips
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "3px",
                    }}>
                        <Typography className="Lato" sx={{
                            fontSize: "0.9rem",
                        }}>
                            Check the status of your trip
                        </Typography>
                        <Tooltip
                            size="sm"
                            showArrow={true}
                            placement="right"
                            content={
                                <Box sx={{
                                    display: 'flex',
                                    width: '20vw',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    padding: '10px',
                                }}>
                                    <Typography className="Lato" sx={{
                                        fontSize: "1.7vh",
                                        color: "black",
                                    }}>
                                        The "trip code" is a random combination of letters and numbers. For example: R6GTGP
                                    </Typography>
                                    <Typography className="Lato" sx={{
                                        fontSize: "1.7vh",
                                        color: "black",
                                        fontWeight: '700'
                                    }}>
                                        Where can I find the trip code?
                                    </Typography>
                                    <Typography className="Lato" sx={{
                                        fontSize: "1.7vh",
                                        color: "black",
                                    }}>
                                        You can find it in your confirmation email that was sent to the contact email at the time of making your quote.
                                    </Typography>
                                </Box>
                            }
                        >
                            <HelpIcon sx={{ fontSize: "1rem", color: '#E68A00' }} />
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}>
                    <Box sx={{ width: "80%" }}>
                        <Input
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "bg-transparent",
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "shadow-md",
                                    "bg-default-200/50",
                                    "dark:bg-default/60",
                                    "backdrop-blur-md",
                                    "backdrop-saturate-200",
                                    "hover:bg-default-200/70",
                                    "dark:hover:bg-default/70",
                                    "group-data-[focus=true]:bg-default-200/50",
                                    "dark:group-data-[focus=true]:bg-default/60",
                                    "!cursor-text",
                                ],
                            }}
                            label="Trip code"
                            radius="sm"
                            value={tripCode}
                            onChange={(e) => setTripCode(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ width: "80%" }}>
                        <Input
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "bg-transparent",
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "shadow-xl",
                                    "bg-default-200/50",
                                    "dark:bg-default/60",
                                    "backdrop-blur-xl",
                                    "backdrop-saturate-200",
                                    "hover:bg-default-200/70",
                                    "dark:hover:bg-default/70",
                                    "group-data-[focus=true]:bg-default-200/50",
                                    "dark:group-data-[focus=true]:bg-default/60",
                                    "!cursor-text",
                                ],
                            }}
                            label="Lastname"
                            radius="lg"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Box>
                    {errorMessage && (
                        <Typography sx={{ color: 'red', fontSize: '0.9rem' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Box sx={{ width: "80%" }}>
                        <Button
                            sx={{
                                width: "100%",
                                backgroundColor: "#e68a00",
                                borderRadius: "50px",
                                padding: "15px",
                                fontSize: "1.1rem",
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "none",
                                ":hover": {
                                    backgroundColor: "white",
                                    color: "#e68a00",
                                },
                                ":disabled": {
                                    backgroundColor: "gray",
                                    color: "white",
                                    cursor: "not-allowed",
                                }
                            }}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "white" }} />
                            ) : (
                                <>
                                    Go to my Trip
                                    <FlightIcon sx={{ marginLeft: "10px" }} />
                                </>
                            )}
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}