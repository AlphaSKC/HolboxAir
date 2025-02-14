import { Box } from "@mui/material";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const { origen, destino, fechaSalida, fechaRegreso, numeroPasajeros, precioEstimado } = location.state || {};

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '10vw', paddingY: '10vh' }}>
            <CheckoutForm
                origen={origen}
                destino={destino}
                fechaSalida={fechaSalida}
                fechaRegreso={fechaRegreso}
                numeroPasajeros={numeroPasajeros}
                precioEstimado={precioEstimado}
            />
        </Box>
    );
}