import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import FlightDetail from "../components/myTrips/FlightDetail";

export default function MyFlightPage() {
    const location = useLocation();
    const { tipo, identificador, pasajeroPrincipal, correoPasajero, telefonoPasajero, origen, destino, fechaSalida, fechaRegreso, numeroPasajeros, precio, estado, codigo, fechaCreacion, notas } = location.state || {};

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <FlightDetail
                tipo={tipo}
                identificador={identificador}
                pasajeroPrincipal={pasajeroPrincipal}
                correoPasajero={correoPasajero}
                telefonoPasajero={telefonoPasajero}
                origen={origen}
                destino={destino}
                fechaSalida={fechaSalida}
                fechaRegreso={fechaRegreso}
                numeroPasajeros={numeroPasajeros}
                precio={precio}
                estado={estado}
                codigo={codigo}
                fechaCreacion={fechaCreacion}
                notas={notas}
            />
        </Box>
    );
}