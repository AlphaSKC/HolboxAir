import { Box, Grid2, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Topics from "../../utils/Topics.json";
import { useEffect } from "react";

export default function AddedValueTemplate() {
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    console.log(Topics);
    console.log(name);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        my: "2vh",
        overflowX: "hidden",
      }}
    >
      {Topics.map((topic) => {
        if (topic.route === "/topics/" + name) {
          return (
            <Grid2
              container
              spacing={2}
              sx={{
                marginY: "1rem",
                justifyContent: "center",
                width: "80%",
              }}
            >
              <Grid2
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  className="Oswald"
                  sx={{
                    fontSize: "4.5vh",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {topic.title}
                </Typography>
              </Grid2>
              <Grid2
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  order: topic.id % 2 === 0 ? 2 : 1,
                }}
              >
                <img
                  src={topic.img}
                  style={{ width: "100%" }}
                  alt={`Image of ${topic.title}`}
                />
              </Grid2>
              <Grid2
                size={{ xs: 12, md: 6 }}
                key={topic.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2vh",
                  justifyContent: "center",
                  order: topic.id % 2 === 0 ? 1 : 2,
                }}
              >
                <Typography
                  className="Lato"
                  sx={{
                    fontSize: "3vh",
                    color: "black",
                  }}
                  dangerouslySetInnerHTML={{ __html: topic.content || "" }}
                />
              </Grid2>
            </Grid2>
          );
        }
        return null;
      })}
    </Box>
  );
}
