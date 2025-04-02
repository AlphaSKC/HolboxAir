import { Box, Divider, Grid2, Typography } from "@mui/material";

interface PaymentSummaryProps {
    totalPrice: number;
    amountPaid: number;
}

export default function PaymentSummary({ totalPrice, amountPaid }: PaymentSummaryProps) {
    const remainingAmount = totalPrice - (amountPaid ?? 0);

    return (
        <Box sx={{ borderRadius: "15px", border: "1px solid #e3e3e3", padding: "20px", width: "60%" }}>
            <Typography
                className="Lato"
                component="h1"
                fontSize={15}
                fontWeight={600}
                alignItems={"center"}
                display={"flex"}
                gap={2}
                marginBottom={2}
            >
                Payment Summary
            </Typography>
            <Divider />
            <Grid2 container marginY={2} spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                    <Typography className="Lato" fontWeight="bold" color="#E68A00">
                        Total Price:
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                    <Typography className="Lato">${totalPrice} USD</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                    <Typography className="Lato" fontWeight="bold" color="#E68A00">
                        Amount Paid:
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                    <Typography className="Lato">${amountPaid} USD</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                    <Typography className="Lato" fontWeight="bold" color="#E68A00">
                        Remaining Amount:
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                    <Typography className="Lato">${remainingAmount} USD</Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
}