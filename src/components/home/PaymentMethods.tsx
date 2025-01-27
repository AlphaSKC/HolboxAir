import { Box } from "@mui/material";

import Bitcoin from "../../assets/img/paymentMethods/Bitcoin S.png";
import MasterCard from "../../assets/img/paymentMethods/MastercardS.png";
import Visa from "../../assets/img/paymentMethods/VisaS.png";
import Transfer from "../../assets/img/paymentMethods/Wire transfer S.png";
import Cash from "../../assets/img/paymentMethods/Cash S.png";
import American from "../../assets/img/paymentMethods/American Express.png";
import Marquee from "react-fast-marquee";

export default function PaymentMethods() {
  return (
    <Box sx={{ width: "100%", display: "grid", placeItems: "center" }}>
      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Marquee speed={20}>
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Bitcoin}
              alt="Bitcoin"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={MasterCard}
              alt="MasterCard"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Visa}
              alt="Visa"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Transfer}
              alt="Transfer"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Cash}
              alt="Cash"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={American}
              alt="American"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Bitcoin}
              alt="Bitcoin"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={MasterCard}
              alt="MasterCard"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Visa}
              alt="Visa"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Transfer}
              alt="Transfer"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Cash}
              alt="Cash"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={American}
              alt="American"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Bitcoin}
              alt="Bitcoin"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={MasterCard}
              alt="MasterCard"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Visa}
              alt="Visa"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Transfer}
              alt="Transfer"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={Cash}
              alt="Cash"
            />
            <img
              style={{ width: "5vw", margin: "0 25px" }}
              src={American}
              alt="American"
            />
          </Marquee>
        </Box>
      </Box>
    </Box>
  );
}
