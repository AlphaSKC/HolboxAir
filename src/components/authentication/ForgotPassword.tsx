import { Box, Button } from "@mui/material";
import { Form, Input } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

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
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1vh" }}>
            <p style={{ fontSize: "4vh", fontWeight: "bold" }}>
              Forgot your password?
            </p>
            <p style={{ fontSize: "2.5vh", color: "#333333" }}>
              Enter your email to reset your password
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
            }}
          >
            Reset Password
          </Button>
        </Form>
      </Box>
    </Box>
  );
}
