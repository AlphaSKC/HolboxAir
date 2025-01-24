import { Box, Button, Typography } from "@mui/material";
import { Input, Tooltip } from "@nextui-org/react";
import FlightIcon from '@mui/icons-material/Flight';

export default function TripForm() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            minHeight: "60vh",
            height: { xs: "fit-content", md: "60vh" },
            width: "100%",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: { xs: "90%", md: "80%" },
                height: "100%",
                paddingX: "20px",
                backgroundColor: "red",
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
                        Manage your quote
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
                            Check the status of your quote
                        </Typography>
                        <Tooltip>
                            <Button
                                sx={{
                                    minWidth: "15px",
                                    height: "15px",
                                    fontSize: "0.25rem",
                                    borderRadius: "50%",
                                    backgroundColor: "#e68a00",
                                    color: "white",
                                    ":hover": {
                                        backgroundColor: "white",
                                        color: "#e68a00",
                                    },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                ?
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "blue",
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
                            label="Quote code"
                            radius="sm"
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
                        />
                    </Box>
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
                                }
                            }}
                        >
                            Go to my quote
                            <FlightIcon sx={{ marginLeft: "10px" }} />
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}