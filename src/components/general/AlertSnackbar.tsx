import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";
import React from "react";

interface AlertSnackbarProps {
    open: boolean;
    severity: "success" | "error";
    message: string;
    onClose: () => void;
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ open, severity, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            TransitionComponent={SlideTransition}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;