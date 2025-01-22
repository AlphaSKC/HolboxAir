import { Box, Button, Typography } from "@mui/material";
import { Input } from "@nextui-org/react";
import { AccountCircle } from "@mui/icons-material";
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
            paddingY: "20px",
            paddingX: { xs: "10px", md: "20px" },
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: { xs: "90%", md: "80%" },
                height: "100%",
                paddingX: "20px",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography>
                        Check the status of your quote
                    </Typography>
                    <Typography>
                        Check the status of your quote
                    </Typography>
                </Box>
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
                    label="Passengers"
                    type="number"
                    placeholder="0"
                    radius="lg"
                    startContent={
                        <AccountCircle />
                    }
                />
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
                    label="Passengers"
                    type="number"
                    placeholder="0"
                    radius="lg"
                    startContent={
                        <AccountCircle />
                    }
                />
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
                        marginTop: "20px",
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
    );
}