import { Box, Button, CircularProgress, Grid2 } from "@mui/material";
import { Form, Input, Textarea } from "@nextui-org/react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { SendContactForm } from "../../services/UserService";
import AlertSnackbar from "../general/AlertSnackbar";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        contenido: ''
    });

    const [loading, setLoading] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">('success');

    const sendEmail = async () => {
        setLoading(true);
        try {
            const response = await SendContactForm(formData);
            if (response.success) {
                setAlertMessage('Email sent successfully!');
                setAlertSeverity('success');
                setFormData({
                    nombre: '',
                    email: '',
                    asunto: '',
                    contenido: ''
                });
            }
            else {
                setAlertMessage('Error sending email!');
                setAlertSeverity('error');
            }
        }
        catch (error) {
            setAlertMessage('Error sending email!');
            setAlertSeverity('error');
        }
        finally {
            setAlertOpen(true);
            setLoading(false);
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        sendEmail();
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
                            value={formData.nombre}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    nombre: e.target.value
                                })
                            }}
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
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }}
                            isClearable
                            label="Email"
                            labelPlacement='inside'
                            startContent={
                                <EmailIcon />
                            }
                            value={formData.email}
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
                            value={formData.asunto}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    asunto: e.target.value
                                })
                            }}
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
                            value={formData.contenido}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    contenido: e.target.value
                                })
                            }}
                            placeholder="Enter your message here"
                            size="lg"
                            minRows={6}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} sx={{ width: '100%' }}>
                    <Grid2 size={12} sx={{
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
                            },
                            ":disabled":{
                                backgroundColor: "#ccc",
                                color: "#666"
                            }
                        }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress sx={{ color: 'white' }} />
                                : (
                                    <>
                                        Send
                                        <SendIcon sx={{ marginLeft: '0.5vw' }} />
                                    </>
                                )}
                        </Button>
                    </Grid2>
                </Grid2>
            </Form>
            <AlertSnackbar
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
                severity={alertSeverity}
            />
        </Box>
    )
}