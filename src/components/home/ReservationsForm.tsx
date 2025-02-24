import { Box, Button, Grid2 } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

//ICONOS
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightIcon from "@mui/icons-material/Flight";
import { AccountCircle } from "@mui/icons-material";

//DATE PICKER
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";

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
    name: "Cozumel",
    key: "CZM",
  },
];

const CustomDateTimePicker: React.FC<DateTimePickerProps<any>> = (props) => {
  return (
    <DateTimePicker
      {...props}
      ampm={false}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc",
          transition: "border-color 0.3s ease",
        },
        "& .MuiOutlinedInput-root:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#e68a00",
          },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#e68a00",
          },
        "& .MuiInputLabel-root": {
          color: "#52525b",
          "&.Mui-focused": {
            color: "#e68a00",
          },
        },
        "& .MuiFormHelperText-root.Mui-error": {
          color: "transparent",
        },
      }}
    />
  );
};

export default function ReservationsForm() {
  const [isSencillo, setIsSencillo] = useState(false);
  const navigate = useNavigate();

  const [origin, setOrigin] = useState(places[0].name);
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState<any>(dayjs().add(1, "day"));
  const [returnDate, setReturnDate] = useState<any>(
    dayjs().add(1, "day").add(4, "hour")
  );
  const [passengers, setPassengers] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(places);

  useEffect(() => {
    setDeparture(dayjs().add(1, "day"));
    setReturnDate(dayjs().add(1, "day").add(4, "hour"));
  }, []);

  useEffect(() => {
    if (isSencillo) {
      setReturnDate(null);
    } else {
      setReturnDate(dayjs(departure).add(4, "hour"));
    }
  }, [isSencillo, departure]);

  useEffect(() => {
    setFilteredDestinations(places.filter((place) => place.name !== origin));
  }, [origin]);

  const sendData = () => {
    const data = {
      origen: origin,
      destino: destination,
      fechaSalida: departure ? departure.format() : null,
      fechaRegreso: isSencillo ? null : returnDate ? returnDate.format() : null,
      numeroPasajeros: passengers,
      precioEstimado: 150 * passengers,
    };
    console.log(data);
    navigate("/checkout", { state: data });
  };

  const handlePassengersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      setPassengers(value);
    } else if (value > 10) {
      setPassengers(10);
    } else {
      setPassengers(1);
    }
  };

  const isFormValid = () => {
    return (
      origin &&
      destination &&
      departure &&
      (isSencillo || returnDate) &&
      passengers >= 1 &&
      passengers <= 10
    );
  };

  const handleSwap = () => {
    const tempOrigin = origin;
    const tempDestination = destination;
    setOrigin(tempDestination);
    setDestination(tempOrigin);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        alignItems: { xs: "center", md: "flex-end" },
        minHeight: "60vh",
        height: { xs: "fit-content", md: "80vh" },
        width: "100%",
        paddingY: "20px",
        paddingX: { xs: "10px", md: "20px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "90%", md: "80%" },
          height: "100%",
          paddingX: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "fit-content",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "5px",
            gap: "5px",
          }}
        >
          <Button
            sx={{
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
          <Button
            sx={{
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
          <Grid2
            size={{ xs: 12, md: 5 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Autocomplete
              className="max-w-lg "
              defaultItems={places}
              defaultSelectedKey={"CUN"}
              label="Origin"
              size="lg"
              startContent={<FlightTakeoffIcon />}
              value={origin}
              onSelectionChange={(key) => {
                const selectedPlace = places.find((place) => place.key === key);
                setOrigin(selectedPlace ? selectedPlace.name : "");
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 2 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginY: "5px",
            }}
          >
            <Button
              sx={{
                width: "fit-content",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #ccc",
                color: "#595959",
              }}
              onClick={handleSwap}
            >
              <SwapHorizIcon sx={{ height: "5vh" }} />
            </Button>
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 5 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Autocomplete
              className="max-w-lg"
              defaultItems={filteredDestinations}
              label="Destination"
              size="lg"
              startContent={<FlightLandIcon />}
              value={destination}
              onSelectionChange={(key) => {
                const selectedPlace = places.find((place) => place.key === key);
                setDestination(selectedPlace ? selectedPlace.name : "");
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} width={"100%"} sx={{ marginTop: "20px" }}>
          <Grid2 size={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <CustomDateTimePicker
                  label="Departure"
                  value={departure}
                  onChange={(newValue) => setDeparture(dayjs(newValue))}
                  minDate={dayjs().add(1, "day")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>
          <Grid2 size={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <CustomDateTimePicker
                  label="Return"
                  disabled={isSencillo}
                  value={returnDate}
                  onChange={(newValue) => setReturnDate(dayjs(newValue))}
                  minDateTime={dayjs(departure).add(4, "hour")}
                />
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
              placeholder="1"
              radius="lg"
              startContent={<AccountCircle />}
              value={passengers === 0 ? "" : passengers.toString()}
              onChange={handlePassengersChange}
              min={1}
              max={10}
            />
          </Grid2>
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
              label="Promo Code"
              placeholder="Enter promo code"
              radius="lg"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              endContent={
                promoCode && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Button sx={{ fontSize: "1.3vh", color: "#E38A00" }}>
                      Validate Code
                    </Button>
                  </Box>
                )
              }
            />
          </Grid2>
        </Grid2>
        <Button
          sx={{
            width: "100%",
            backgroundColor: isFormValid() ? "#e68a00" : "#ccc",
            borderRadius: "50px",
            padding: "15px",
            fontSize: "1.1rem",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            marginTop: "20px",
            ":hover": {
              backgroundColor: isFormValid() ? "white" : "#ccc",
              color: isFormValid() ? "#e68a00" : "white",
            },
          }}
          onClick={sendData}
          disabled={!isFormValid()}
        >
          Quote Flight
          <FlightIcon sx={{ marginLeft: "10px" }} />
        </Button>
      </Box>
    </Box>
  );
}
