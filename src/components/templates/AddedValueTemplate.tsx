import { Box, Grid2, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Topics from "../../utils/Topics.json";
import { Helmet } from "react-helmet";

export default function AddedValueTemplate() {
	const { name } = useParams<{ name: string }>();
	const topic = Topics.find((topic) => topic.route === "/topics/" + name);
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
			{topic && (
				<>
					<Helmet>
						<title>{`Holbox Air: ${topic.title}`}</title>
						<meta
							name="description"
							content={topic.content?.substring(0, 150) || "Learn more about this topic on Holbox Air."}
						/>
						<meta name="keywords" content={`${topic.title}, Holbox Air, topics`} />
						<meta name="author" content="Holbox Air" />
						<link rel="canonical" href={`https://holboxair.com/topics/${name}`} />
						<meta name="og:title" content={`${topic.title} | Holbox Air`} />
						<meta
							name="og:description"
							content={topic.content?.substring(0, 150) || "Learn more about this topic on Holbox Air."}
						/>
						<meta name="og:image" content="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2F18007db3dd054cd8939b4ee99dea7d67&methods=resize%2C1200%2C5000" />
						<meta name="og:url" content={`https://holboxair.com/topics/${name}`} />
						<meta name="og:type" content="website" />
						<meta name="og:site_name" content="Holbox Air" />
					</Helmet>
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
				</>
			)}
		</Box>
	);
}
