import { Alert, Box, Button, Slide, SlideProps, Snackbar } from "@mui/material";
import { Form, Input } from "@nextui-org/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SendCode } from "../../services/AuthService";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      const data = {
        emailAdmin: email,
      }
      const response = await SendCode(data);
      setAlertMessage(response.message);
      setAlertSeverity(response.success ? 'success' : 'error');
      setAlertOpen(true);
      if (response.success) {
        localStorage.setItem("forgotPasswordCompleted", 'true');
        localStorage.setItem("ForgotPasswordEmail", email);
        navigate("/verify-code");
      }
    }
    finally {
      setIsLoading(false);
    }
  }


  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Box className="flex h-full w-full items-center justify-center">
      <Box className="flex w-full max-w-md flex-col gap-4 bg-content1 rounded-large px-8 pb-10 pt-6 mx-4">
        <NavLink to={"/"}>
          <Box className="flex justify-center">
            <img
              src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fc9930c02910c48f79abbd96f757f76c2&methods=resize%2C500%2C5000"
              alt="Logo Holbox Air"
              loading="lazy"
              style={{ width: "70%", height: "auto" }}
            />
          </Box>
        </NavLink>
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1vh" }}>
            <p style={{ fontSize: "4vh", fontWeight: "bold" }}>
              Forgot your password?
            </p>
            <p style={{ fontSize: "2.5vh", color: "#333333" }}>
              Enter your email to send a code to reset your password
            </p>
          </Box>
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box className="flex w-full items-center justify-end px-1 py-2">
            <NavLink
              to={"/admin"}
              className="text-default-500 nav-link"
              style={{ fontSize: "2.2vh" }}
            >
              Remember your password? Login here
            </NavLink>
          </Box>
          <Button
            type="submit"
            sx={{
              width: "100%",
              backgroundColor: "#e68a00",
              borderRadius: "50px",
              padding: "10px",
              fontSize: "2.2vh",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              ":hover": {
                backgroundColor: "white",
                color: "#e68a00",
              },
              ":disabled": {
                backgroundColor: "#c4c4c4",
                color: "black",
              }
            }}
            onClick={handleSendCode}
            disabled={isLoading}
          >
            Reset Password
          </Button>
        </Form>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
