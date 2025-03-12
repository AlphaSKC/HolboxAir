import { PayPalButtons } from "@paypal/react-paypal-js";
import { Box } from "@mui/material";

interface PaypalButtonProps {
    totalValue: number;
    invoice: string;
}

export default function PaypalButton(props: PaypalButtonProps) {
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
                    console.log(order);
                }}
            />
        </Box>
    )
}