import { Typography, Box, Button } from "@mui/material";
import { formatDateTime, getStatusColor } from "../../../utils/utils";
import { Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { AccountCircle } from "@mui/icons-material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { CancelCircleIcon, ShoppingBasketAdd01Icon, ViewIcon } from "hugeicons-react";
import { Reservation } from "../../../types/types";

interface ReservationCardProps {
    reservation: Reservation;
    onView: () => void;
    onCreateOffer: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onView, onCreateOffer }) => {
    return (
        <Card className="py-4" style={{ height: "100%", position: "relative" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "1vh",
                    right: "1vw",
                    width: { xs: "30px", md: "40px" },
                    height: { xs: "30px", md: "40px" },
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(reservation.estado),
                }}
            />
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Typography sx={{ fontSize: "2.5vh", fontWeight: "bold", color: "#2E2E2E" }}>
                    {reservation.pasajeroPrincipal}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <Typography sx={{ fontSize: "2vh", fontWeight: "bold", color: "#7D7D7D" }}>
                        {reservation.origen} - {reservation.destino}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <FlightTakeoffIcon sx={{ color: "#E38A00" }} />
                    <Typography sx={{ fontSize: "1.8vh", fontWeight: "bold", color: "#7D7D7D" }}>
                        {formatDateTime(reservation.fechaSalida).date} - {formatDateTime(reservation.fechaSalida).time}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <FlightLandIcon sx={{ color: "#E38A00" }} />
                    <Typography sx={{ fontSize: "1.8vh", fontWeight: "bold", color: "#7D7D7D" }}>
                        {formatDateTime(reservation.fechaRegreso).date}
                        {formatDateTime(reservation.fechaRegreso).date !== "N/A" && ` - ${formatDateTime(reservation.fechaRegreso).time}`}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <AccountCircle sx={{ color: "#E38A00" }} />
                    <Typography sx={{ fontSize: "1.8vh", fontWeight: "bold", color: "#7D7D7D" }}>
                        {reservation.numeroPasajeros} {reservation.numeroPasajeros > 1 ? "Pasajeros" : "Pasajero"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <AttachMoneyIcon sx={{ color: "#e6a800" }} />
                    <Typography sx={{ fontSize: "1.8vh", fontWeight: "bold", color: "#7D7D7D" }}>
                        {reservation.precioTotal} USD
                    </Typography>
                </Box>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image alt="Card background" className="object-cover rounded-xl" src="https://heroui.com/images/hero-card-complete.jpeg" width={"100%"} />
            </CardBody>
            <CardFooter className={`text-small ${reservation.estado === "Pagado" && !reservation.ofertaCreada ? "justify-between" : "justify-around"}`}>
                <Button variant="outlined" size="small" style={{ borderRadius: "20px", color: "#a8a8a8", borderColor: "#a8a8a8" }} onClick={onView}>
                    <ViewIcon />
                </Button>
                {reservation.estado === "Pagado" && !reservation.ofertaCreada && (
                    <Button variant="outlined" size="small" style={{ borderRadius: "20px", color: "#2196F3", borderColor: "#2196F3" }} onClick={onCreateOffer}>
                        <ShoppingBasketAdd01Icon />
                    </Button>
                )}
                <Button variant="outlined" size="small" style={{ borderRadius: "20px", color: "#FF4D4F", borderColor: "#FF4D4F" }}>
                    <CancelCircleIcon />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ReservationCard;