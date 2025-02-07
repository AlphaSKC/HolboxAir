import { Form, Input } from "@nextui-org/react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Box, Button, Slide, SlideProps, Snackbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminLogin } from "../../services/AuthService";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email: email,
      password: password
    }
    try {
      const response = await AdminLogin(data);
      setAlertMessage(response.message);
      setAlertSeverity(response.success ? 'success' : 'error');
      setAlertOpen(true);
      if (response.success) {
        localStorage.setItem('profile', JSON.stringify(response.result));
        navigate('/dashboard');
      }
    }
    catch (error) {
      setAlertMessage('Error al iniciar sesión. Inténtalo de nuevo.');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Box className="flex h-full w-full items-center justify-center">
      <Box className="flex w-full max-w-sm flex-col gap-4 bg-content1 rounded-large px-8 pb-10 pt-6">
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
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box className="flex w-full items-center justify-end px-1 py-2">
            <NavLink
              to={"/forgotPassword"}
              className="text-default-500 nav-link"
              style={{ fontSize: "2.2vh" }}
            >
              Forgot your password?
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
              ':disabled': {
                backgroundColor: '#A0A0A0',
                color: '#000',
                cursor: 'not-allowed',
              }
            }}
            disabled={isLoading}
          >
            Log in
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
