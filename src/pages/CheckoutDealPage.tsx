import { Box } from "@mui/material";
import CheckoutDealForm from "../components/flightDeals/CheckoutDealForm";
import { useLocation } from "react-router-dom";

export default function CheckoutDealPage() {
    const location = useLocation();
    const { ofertaID, origen, destino, fechaSalida, disponibilidad, precio } = location.state || {};

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '10vw', paddingY: '10vh' }}>
            <CheckoutDealForm
                ofertaID={ofertaID}
                origen={origen}
                destino={destino}
                fechaSalida={fechaSalida}
                disponibilidad={disponibilidad}
                precio={precio}
            />
        </Box>
    )
}