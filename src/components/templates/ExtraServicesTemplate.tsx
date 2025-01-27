import { Box, Divider, Grid2, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import Services from "../../utils/ExtraServices.json";
import { useEffect } from "react";

export default function ExtraServicesTemplate() {
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginY: "2rem",
        overflowX: "hidden",
      }}
    >
      {Services.extraServices.map((service) => {
        if (service.route === "/extraServices/" + name) {
          return (
            <Grid2
              container
              spacing={2}
              sx={{ marginY: "1rem", justifyContent: "center", width: "80%" }}
            >
              <Grid2
                data-aos="fade-right"
                size={{ xs: 12, md: 6 }}
                key={service.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2vh",
                  justifyContent: "center",
                }}
              >
                <Typography
                  className="Oswald"
                  sx={{
                    fontSize: "4.5vh",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  className="Oswald"
                  sx={{
                    fontSize: "3vh",
                    color: "black",
                  }}
                  dangerouslySetInnerHTML={{ __html: service.content || "" }}
                />
                <Divider sx={{ width: "100%", bgcolor: "#ccc" }} />
                <Typography
                  className="Oswald"
                  sx={{
                    fontSize: "3vh",
                    color: "black",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: service.additionalInfo || "",
                  }}
                />
                <Divider sx={{ width: "100%", bgcolor: "#ccc" }} />
              </Grid2>
              <Grid2 data-aos="fade-left" size={{ xs: 12, md: 6 }} key={service.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={service.img}
                    style={{ width: "70%" }}
                    alt={`Image of ${service.title}`}
                  />
                </Box>
              </Grid2>
            </Grid2>
          );
        }
        return null;
      })}
    </Box>
  );
}
