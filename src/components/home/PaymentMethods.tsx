import { Box } from "@mui/material";

import PaymentMethodsImg from '../../assets/img/others/PaymentMethods.jpg';

export default function PaymentMethods() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginY: '0.5vh',
        }}>
            <Box sx={{
                width: {xs:'90%', sm:'80%', md:'60%'},
                // borderRadius: '10px',
                // border: '1px solid #e6e6e6',
                // marginY:'2vh',
                background: `url(${PaymentMethodsImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                paddingY: '5vh',
                alignItems: 'center',
            }}
            />
        </Box>
    );
}