import { Input } from "@nextui-org/react";
import { Grid2 } from "@mui/material";

interface PassengerInfoProps {
    name: string;
    email: string;
    phone: string;
}

export default function PassengerInfo({ name, email, phone }: PassengerInfoProps) {
    return (
        <Grid2 container marginY={2} spacing={2}>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Input
                    label="Full Name"
                    value={name}
                    radius="lg"
                    disabled
                    className="Lato"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Input
                    label="Email"
                    value={email}
                    radius="lg"
                    disabled
                    className="Lato"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Input
                    label="Phone"
                    value={phone}
                    radius="lg"
                    disabled
                    className="Lato"
                />
            </Grid2>
        </Grid2>
    );
}