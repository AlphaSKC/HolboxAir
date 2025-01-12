import { Box, Button, Grid2 } from "@mui/material";
import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

//ICONOS
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ScheduleIcon from '@mui/icons-material/Schedule';

//DATE PICKER
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

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
        key: "TUL",
    },
    {
        id: 4,
        name: "Playa del Carmen",
        key: "PDC",
    },
    {
        id: 5,
        name: "Mérida",
        key: "MER",
    }
]

export default function ReservationsForm() {
    const [isSencillo, setIsSencillo] = useState(false);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f5f5",
            alignItems: "center",
            height: "60vh",
            width: "100%",
            paddingY: "20px",
        }}>
            <Box sx={{
                backgroundColor: 'blue',
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
                        Viaje redondo
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
                        Viaje sencillo
                    </Button>
                </Box>
                <Grid2 container spacing={0} width={"100%"} sx={{ marginTop: "20px" }}>
                    <Grid2 size={{ xs: 12, md: 5 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Autocomplete
                            className="max-w-lg"
                            defaultItems={places}
                            defaultSelectedKey={"CUN"}
                            label="Origen"
                            placeholder="¿De dónde sales?"
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
                            <SwapHorizIcon />
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 5 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Autocomplete
                            className="max-w-lg"
                            defaultItems={places}
                            label="Destino"
                            placeholder="Selecciona un destino"
                            startContent={<FlightLandIcon />}
                        >
                            {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                        </Autocomplete>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} width={"100%"} sx={{ marginTop: "20px" }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: "5px",
                                    }}
                                    
                                    slots={{openPickerIcon: ScheduleIcon}}
                                    label="Salida"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: "5px",
                                    }}
                                    label="Regreso"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
}