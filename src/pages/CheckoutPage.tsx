import { Box, Grid2 } from "@mui/material";
import PassengerForm from "../components/checkout/PassengerForm";
import CheckoutFlight from "../components/checkout/CheckoutFlight";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const { origen, destino, fechaSalida, fechaRegreso, numeroPasajeros, precioEstimado } = location.state || {};

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingX: '10vw' }}>
            <Grid2 container spacing={2} marginY={2}>
                <Grid2 size={{ sm: 6, md: 8 }}>
                    <PassengerForm
                        origen={origen}
                        destino={destino}
                        fechaSalida={fechaSalida}
                        fechaRegreso={fechaRegreso}
                        numeroPasajeros={numeroPasajeros}
                        precioEstimado={precioEstimado}
                    />
                </Grid2>
                <Grid2 size={{ sm: 6, md: 4 }}>
                    <CheckoutFlight
                        origen={origen}
                        destino={destino}
                        fechaSalida={fechaSalida}
                        fechaRegreso={fechaRegreso}
                        numeroPasajeros={numeroPasajeros}
                        precioEstimado={precioEstimado}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
}