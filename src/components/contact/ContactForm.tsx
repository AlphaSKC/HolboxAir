import { Box, Button, Checkbox, FormControlLabel, Grid2 } from "@mui/material";
import { Form, Input, Textarea } from "@nextui-org/react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState<any>(null);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);
    }
    return (
        <Box sx={{
            marginY: '2rem',
            width: '70%',
            borderRadius: '10px',
            border: '1px solid #ccc',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Form validationBehavior="native" onSubmit={onSubmit}>
                <Grid2 container spacing={2} sx={{ width: '100%' }}>
                    <Grid2 size={{ xs: 12, md: 6 }} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.8rem'
                    }}>
                        <Input
                            isRequired
                            isClearable
                            label="Name"
                            labelPlacement='inside'
                            startContent={
                                <PersonIcon />
                            }
                            type="text"
                        />
                        <Input
                            isRequired
                            errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.typeMismatch) {
                                    return "Please enter a valid email address";
                                }
                                return validationErrors;
                            }}
                            isClearable
                            label="Email"
                            labelPlacement='inside'
                            startContent={
                                <EmailIcon />
                            }
                            type="email"
                        />
                        <Input
                            isRequired
                            isClearable
                            label="Subject"
                            errorMessage="This field is required"
                            labelPlacement='inside'
                            startContent={
                                <SubjectIcon />
                            }
                            type="text"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Textarea
                            isRequired
                            isClearable
                            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                            label="Message"
                            labelPlacement="inside"
                            placeholder="Enter your message here"
                            size="lg"
                            minRows={6}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} sx={{ width: '100%' }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <FormControlLabel
                            control={<Checkbox sx={{
                                color: "#e68a00",
                                '&.Mui-checked': {
                                    color: "#e68a00",
                                }
                            }} />}
                            label=" I give my permission to be contact by Holbox Air."
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }} sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Button type="submit" sx={{
                            backgroundColor: "#e68a00",
                            borderRadius: "5px",
                            padding: "10px 15px",
                            fontSize: "2.2vh",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            ":hover": {
                                backgroundColor: "white",
                                color: "#e68a00",
                            }
                        }}>
                            Send
                            <SendIcon sx={{ marginLeft: '0.5vw' }} />
                        </Button>
                    </Grid2>
                </Grid2>
            </Form>
        </Box>
    )
}