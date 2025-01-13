import { Box, Button, Grid2 } from "@mui/material";
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";

//ICONOS
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightIcon from '@mui/icons-material/Flight';

//DATE PICKER
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { AccountCircle } from "@mui/icons-material";

const places = [
    {
        id: 1,
        name: "Cancún",
        key: "CUN",
    },
    {
        id: 2,
        name: "Holbox",
        key: "HOL",
    },
    {
        id: 3,
        name: "Tulum",
        key: "TQO",
    },
    {
        id: 4,
        name: "Playa del Carmen",
        key: "PCE",
    },
    {
        id: 5,
        name: "Mérida",
        key: "MID",
    },
    {
        id: 6,
        name: 'Cozumel',
        key: 'CZM',
    }
]

const CustomDateTimePicker: React.FC<DateTimePickerProps<any>> = (props) => {
    return (
        <DateTimePicker
            {...props}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                    transition: "border-color 0.3s ease",
                },
                "& .MuiOutlinedInput-root:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e68a00",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e68a00",
                },

                "& .MuiInputLabel-root": {
                    color: "#52525b",
                    "&.Mui-focused": {
                        color: "#e68a00"
                    },
                },
            }}
        />
    );
}

export default function ReservationsForm() {
    const [isSencillo, setIsSencillo] = useState(false);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f5f5",
            alignItems: "center",
            minHeight: "60vh",
            height: { xs: "fit-content", md: "60vh" },
            width: "100%",
            paddingY: "20px",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "80%",
                height: "100%",
                paddingX: "20px",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: 'fit-content',
                    backgroundColor: "white",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    padding: "5px",
                    gap: "5px",
                }}>
                    <Button sx={{
                        padding: "5px 10px",
                        backgroundColor: isSencillo ? "white" : "#e68a00",
                        borderRadius: "10px",
                        fontSize: "0.8rem",
                        color: isSencillo ? "#595959" : "white",
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                        onClick={() => setIsSencillo(false)}
                    >
                        Round Trip
                    </Button>
                    <Button sx={{
                        padding: "5px 10px",
                        backgroundColor: isSencillo ? "#e68a00" : "white",
                        borderRadius: "10px",
                        fontSize: "0.8rem",
                        color: isSencillo ? "white" : "#595959",
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                        onClick={() => setIsSencillo(true)}
                    >
                        One Way
                    </Button>
                </Box>
                <Grid2 container spacing={0} width={"100%"} sx={{ marginTop: "20px" }}>
                    <Grid2 size={{ xs: 12, md: 5 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Autocomplete
                            className="max-w-lg "
                            defaultItems={places}
                            defaultSelectedKey={"CUN"}
                            label="Origin"
                            placeholder="Where are you traveling from?"
                            size="lg"
                            startContent={<FlightTakeoffIcon />}
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.name}</AutocompleteItem>}
                        </Autocomplete>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginY: "5px" }}>
                        <Button sx={{
                            width: "fit-content",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            color: "#595959",
                        }}>
                            <SwapHorizIcon sx={{ height: '5vh' }} />
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 5 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Autocomplete
                            className="max-w-lg"
                            defaultItems={places}
                            label="Destination"
                            size="lg"
                            placeholder="Where are you traveling to?"
                            startContent={<FlightLandIcon />}
                        >
                            {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                        </Autocomplete>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} width={"100%"} sx={{ marginTop: "20px" }}>
                    <Grid2 size={{ xs: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <CustomDateTimePicker label="Departure" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={{ xs: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <CustomDateTimePicker label="Return" disabled={isSencillo} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} width={"100%"} sx={{ marginTop: "20px" }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
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
                    </Grid2>
                </Grid2>
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
                        ":hover":{
                            backgroundColor: "white",
                            color: "#e68a00",
                        }
                    }}
                >
                    Quote Flight
                    <FlightIcon sx={{ marginLeft: "10px" }} />
                </Button>
            </Box>
        </Box>
    );
}