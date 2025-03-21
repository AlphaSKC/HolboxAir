import { Box, Grid2, IconButton, Typography } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Home", route: "/" },
  { name: "About", route: "/about" },
  { name: "Gallery", route: "/gallery" },
  { name: "My Trips", route: "/myTrips" },
  { name: "Flight Deals", route: "/flights" },
  { name: "Contact", route: "/contact" },
];

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#333", color: "white", padding: "2.5vh 4vw" }}>
      <Grid2 container spacing={4} sx={{ justifyContent: "center" }}>
        {/* About Us */}
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              className="Oswald"
              sx={{ fontSize: "3.2vh", fontWeight: "bold" }}
            >
              About Us
            </Typography>
            <Box sx={{ display: "flex", width: "100%", mt: "0.5vh" }}>
              <Box
                sx={{ width: "20%", height: "2px", backgroundColor: "#E68A00" }}
              />
              <Box
                sx={{
                  width: "80%",
                  height: "1.5px",
                  backgroundColor: "#4d4d4d",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: "2vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <NavLink to={"/"} style={{ width: "30%" }}>
              <img
                src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fc9930c02910c48f79abbd96f757f76c2&methods=resize%2C500%2C5000"
                alt="Logo Holbox Air"
                loading="lazy"
                style={{ width: "auto", height: "auto" }}
              />
            </NavLink>
          </Box>
          <Typography
            variant="body1"
            className="text-justify Lato"
            color="#ccc"
          >
            Holbox Air is a air company that offers flights to the most important destinations in the Mexican Caribbean.
          </Typography>
          <Box
            sx={{
              mt: "2vh",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              gap: "1vw",
            }}
          >
            <IconButton href="https://www.facebook.com/KevinS018">
              <Facebook
                sx={{ color: "white", ":hover": { color: "#e68a00" } }}
              />
            </IconButton>
            <IconButton href="https://www.facebook.com/Kevins018/">
              <Instagram
                sx={{ color: "white", ":hover": { color: "#e68a00" } }}
              />
            </IconButton>
          </Box>
        </Grid2>
        {/* Quick Links */}
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              className="Oswald"
              sx={{ fontSize: "3.2vh", fontWeight: "bold" }}
            >
              Quick links
            </Typography>
            <Box sx={{ display: "flex", width: "100%", mt: "0.5vh" }}>
              <Box
                sx={{ width: "20%", height: "2px", backgroundColor: "#E68A00" }}
              />
              <Box
                sx={{
                  width: "80%",
                  height: "1.5px",
                  backgroundColor: "#4d4d4d",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "2vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.route}
                  style={{ color: "#ccc", textDecoration: "none" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#E68A00")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
                >
                  {item.name}
                </NavLink>
              ))}
            </Box>
          </Box>
        </Grid2>
        {/* Contact Us */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              className="Oswald"
              sx={{ fontSize: "3.2vh", fontWeight: "bold" }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", width: "100%", mt: "0.5vh" }}>
              <Box
                sx={{ width: "20%", height: "2px", backgroundColor: "#E68A00" }}
              />
              <Box
                sx={{
                  width: "80%",
                  height: "1.5px",
                  backgroundColor: "#4d4d4d",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "2vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1vh",
              }}
            >
              <Typography className="Lato" sx={{ color: "#ccc" }}>
                <PlaceIcon sx={{ mr: "0.5vw" }} /> Address: Carretera Cancun - Chetumal KM 22, Aeropuerto internacional de Cancun, Terminal FBO CP 77569
              </Typography>
              <Typography className="Lato" sx={{ color: "#ccc" }}>
                <PhoneIcon sx={{ mr: "0.5vw" }} /> Phone: +52 998 347 5737
              </Typography>
              <Typography className="Lato" sx={{ color: "#ccc" }}>
                <EmailIcon sx={{ mr: "0.5vw" }} /> Email: info@holboxair.com
              </Typography>
            </Box>
          </Box>
        </Grid2>
        {/* Terms and Copyright */}
        <Grid2 size={12} sx={{ borderTop: "1px solid #4d4d4d" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: "2vh", color: "#ccc" }}
            >
              Terms of use | Environmental Policy
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: "2vh", color: "#ccc" }}
            >
              &copy; {new Date().getFullYear()} Holbox Air. All rights reserved.
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
