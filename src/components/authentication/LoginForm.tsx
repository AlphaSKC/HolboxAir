import { Form, Input } from "@nextui-org/react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
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
          />
          <Box className="flex w-full items-center justify-end px-1 py-2">
            <NavLink
              to={"/"}
              className="text-default-500 nav-link"
              style={{ fontSize: "2.5vh" }}
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
              fontSize: "2.5vh",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              ":hover": {
                backgroundColor: "white",
                color: "#e68a00",
              },
            }}
          >
            Log in
          </Button>
        </Form>
      </Box>
    </Box>
  );
}
