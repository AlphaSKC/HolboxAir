import { Box, Typography } from "@mui/material";

export default function TermsOfUse() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            padding: 2,
        }}>
            <Typography variant="h4" className="Lato" sx={{ mt: 2, textAlign: "center", fontWeight: "bold", color: '#E68A00' }}>
                SERVICE AGREEMENT: TERMS AND CONDITIONS
            </Typography>
            <Box sx={{ width: { xs: '90%', md: '80%' }, display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 2, borderRadius: '15px', boxShadow: "0 0 10px #e8e8e8", my: 2, bgcolor: "#ffff" }}>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>1. DEFINITIONS</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • <strong>THE COMPANY:</strong> JET PLANE SA DE CV, operating under the commercial name HOLBOX AIR, the service provider.<br />
                        • <strong>THE CLIENT:</strong> The individual or entity requesting the service.<br />
                        • <strong>THE PARTIES:</strong> Refers to both THE COMPANY and THE CLIENT, who are entering into this agreement.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>2. OFFER AND PRICING</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • This offer applies exclusively to the aircraft specified in the initial quote.<br />
                        • THE CLIENT may request a different aircraft, but the price will be subject to change based on the aircraft type and the updated quotation.<br />
                        • All prices listed in the quote are valid at the time they are issued and remain valid for <b>24 hours</b>.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>3. PAYMENTS</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • THE CLIENT must make a down payment to THE COMPANY in order to complete
                        a booking <br />
                        • The remaining payment must be made on the day of the flight. <br />
                        • For Wire transfer payments, the full amount must be paid, and the reservation will
                        be completed once the funds are reflected in the company’s account.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>4. CANCELLATION POLICY</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>• Standard Cancellations:</strong><br />
                        <Box pl={2}>
                            o To receive a <b>100% refund</b>, THE CLIENT must cancel at least <b>72 hours</b> before the scheduled flight.<br />
                            o Please note that while THE COMPANY processes the full refund, bank fees may apply and reduce the final refunded amount.
                        </Box>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>• Flights Deals Cancellations:</strong><br />
                        <Box pl={2}>
                            o Cancellations are not accepted for seats purchased through the "Flight Deals" section.<br />
                            o Seats purchased under this option are only eligible for a refund if the flight cannot be operated due to weather conditions.
                        </Box>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>• Peak Season Cancellations:</strong><br />
                        <Box pl={2}>
                            o Flights reserved during <b>peak season</b> (December 24 – January 7) and cancellations made less than <b>72 hours</b> before departure are <b>non-refundable</b>.
                        </Box>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>• Weather-Related Cancellations:</strong><br />
                        <Box pl={2}>
                            o In case of cancellations due to weather conditions, a <b>100% refund</b> will apply <b>only if the aircraft has not yet departed from its base (Cancun – CUN)</b>.<br />
                            o If the aircraft has already departed, THE CLIENT will be charged for the actual flight time, including repositioning costs.
                        </Box>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>• Refund Timelines:</strong><br />
                        <Box pl={2}>
                            o Refunds for <b>credit card payments</b> may take up to <b>30 days</b> to process.<br />
                            o Refunds for <b>wire transfers</b> may take up to <b>10 days</b>. THE CLIENT must provide the original bank account details used for the payment to receive the refund.
                        </Box>
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>5. ITINERARY CHANGES</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • Itinerary modifications are allowed up to <b>72 hours before the flight</b>, subject to
                        <b>aircraft and crew availability</b>. <br />
                        • Price adjustments may apply based on the new itinerary.   <br />
                        • All change requests must be submitted in writing via email to:
                        <b>info@holboxair.com</b>.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>6. AIRPORT FEES</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • The <b>Cancun Airport Tax (TUA)</b> is not included in the service price.<br />
                        • However, THE CLIENT may be exempt from this tax if they <b>arrive in Cancun by air</b> and <b>depart for Holbox on the same day</b>, by presenting their commercial airline boarding passes.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>7. REQUIRED DOCUMENTATION</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • All passengers must bring their identification on the day of the flight.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>8. RESPONSIBILITIES</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • <b>THE COMPANY</b> guarantees that the aircraft will have all valid and up-to-date documentation, including:
                        <Box pl={2}>
                            o Pilot licenses and medical certificates.<br />
                            o Airworthiness certificate.<br />
                            o Aircraft registration certificate.<br />
                            o Third-party liability insurance, in accordance with <b>Mexican regulations</b>.
                        </Box>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • Aircraft contracted from third parties will operate under their <b>own insurance, permits, and certificates</b>.
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • <b>THE CLIENT</b> is responsible for any <b>damage, loss, or expenses</b> caused to the aircraft due to their actions.
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        • By accepting these terms and conditions, THE CLIENT agrees to cover the <b>full cost of repairs</b> resulting from any damage caused by them.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>9. BAGGAGE ALLOWANCE</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        Please note that baggage allowances are determined based on the aircraft’s performance and available space, rather than standard commercial guidelines. To ensure your luggage can be accommodated on board, we kindly ask that you adhere to the recommended dimensions and weight limits provided.
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>Baggage allowance per passenger</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>1 Checked bag up to 20 kgs (44Lbs)</strong><br />
                        60 x 41 x 26 cm (24 x 16 x 10 In)
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        <strong>1 Carry-on bag up to 5 kgs (11Lbs)</strong><br />
                        40 x 28 cm (16 x 11 In)
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        Any baggage exceeding these limits may not be permitted on the aircraft. In such cases, the company will not be held responsible, and any costs associated with transporting excess or oversized luggage will be borne solely by the passenger.
                    </Typography>
                </Box>
                <Box>
                    <Typography className='Lato' variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                        <strong>10. FLIGHT DEALS</strong>
                    </Typography>
                    <Typography className='Lato' variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                        Please note that flights listed in the "Flight Deals" section are subject to changes in schedule, date, and even cancellations. For this reason, please ensure you have enough flexibility in your itinerary to avoid any inconvenience.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}