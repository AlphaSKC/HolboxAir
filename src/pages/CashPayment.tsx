import { Box, Grid2, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

export default function CashPayment() {
    return (
        <>
            <Helmet>
                <title>Holbox Air: Cash Payment</title>
            </Helmet>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100%",
            }}>
                <Box sx={{
                    width: '100%',
                    bgcolor: '#F5F5F5',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Grid2 container spacing={3} sx={{ width: { xs: '90%', md: '70%' }, padding: '2vh' }}>
                        <Grid2 size={{ xs: 12, md: 7 }} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: '2vh',
                        }}>
                            <Typography className="Oswald" sx={{
                                fontSize: '3.5vh',
                                color: 'black',
                                fontWeight: '500',
                            }}>
                                Cash Payment
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5vh',
                            }}>
                                <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                                    Due to the vulnerability of the Holbox airstrip to rain, we recommend making the remaining payment in cash.. Being an unpaved runway, rain can cause puddles or floods, rendering the runway inoperative for up to 10 days on some occasions.
                                </Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 5 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                            <img src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Ff156189a743e4cfc862415d33fc7e70f&methods=crop%2C0%25%2C0%25%2C100%25%2C75.0293%25%7Cresize%2C1000%2C5000" alt="Holbox Airport landing strip" style={{ width: '100%', height: '70%', borderRadius: '5px' }} />
                        </Grid2>
                    </Grid2>
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Grid2 container spacing={3} sx={{ width: { xs: '90%', md: '70%' }, padding: '2vh' }}>
                        <Grid2 size={{ xs: 12, md: 5 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                            <img src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fc0b3b88562a3422ca694bdae743b8f01&methods=resize%2C1000%2C5000" alt="Flooding in Holbox" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 7 }} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: '2vh',
                        }}>
                            <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                                As this may result in cancellations due to weather circumstances beyond the company's and customers' control, a 100% refund is provided for flights not operated and already paid for. Cash payment allows us to return the money to customers as soon as they are back in Cancun to commence their journey home, reducing wait times compared to other payment methods.
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box sx={{
                    width: '100%',
                    bgcolor: '#F5F5F5',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Grid2 container spacing={3} sx={{ width: { xs: '90%', md: '70%' }, padding: '2vh' }}>
                        <Grid2 size={{ xs: 12, md: 7 }} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: '2vh',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5vh',
                            }}>
                                <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                                    With Credit card payments, refunds can take up to 30 days due to banking system holds, often resulting in financial impact to our customers and a reduction in the final amount received due to bank fees.
                                    Additionally, direct payment in dollars prevents currency loss.
                                </Typography>
                                <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                                    Nevertheless, if you wish to pay the remaining balance with a credit card , it is possible as long as you let us know at the time of booking, please. Payment by credit card does not increase the total amount to be paid.
                                </Typography>
                                <Typography className="Lato" sx={{ fontSize: '2.5vh', fontWeight: '300', color: 'black', textAlign: 'justify' }}>
                                    <b>Important</b> if you choose cash as the payment method for the remaining balance, it cannot be changed later
                                </Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 5 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                            <img src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F39a38fb2a28f4a48901bf5b53d36c6fa&methods=resize%2C1000%2C5000" alt="Cloudy view of Holbox" style={{ width: '100%', height: '60%', borderRadius: '5px' }} />
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
        </>
    )
}