import { PayPalButtons } from "@paypal/react-paypal-js";
import { Box } from "@mui/material";
import { FlightDetails } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { ConfirmFlight } from "../../services/AdminService";

interface PaypalButtonProps {
    totalValue: number;
    invoice: string;
    flightDetails: FlightDetails;
}

export default function PaypalButton(props: PaypalButtonProps) {

    const navigate = useNavigate();

    return (
        <Box sx={{ width: "70%" }}>
            <PayPalButtons
                createOrder={(_, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: props.invoice,
                                amount: {
                                    currency_code: "MXN",
                                    value: props.totalValue.toString(),
                                },
                            }
                        ]
                    });
                }}
                onApprove={async (_, actions) => {
                    const order = await actions.order?.capture();
                    if (order!.status === "COMPLETED") {
                        const data = {
                            tipo: props.flightDetails.tipo,
                            identificador: props.flightDetails.identificador,
                        }
                        const response = await ConfirmFlight(data);
                        if (response.success) {
                            localStorage.setItem("payCompleted", "true");
                            navigate("/");
                        }
                    }
                }}
            />
        </Box>
    )
}