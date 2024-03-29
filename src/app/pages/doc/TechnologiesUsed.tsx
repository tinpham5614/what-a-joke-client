import { Container, Typography, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

const technologies = [
  {
    name: "Joke API",
    url: "https://jokeapi.dev/",
  },
  {
    name: "Next.js (Frontend)",
    url: "https://nextjs.org/",
  },
  {
    name: "Material-UI",
    url: "https://mui.com/",
  },
  {
    name: "NestJS (Backend)",
    url: "https://nestjs.com/",
  },
  {
    name: "MongoDB (Database)",
    url: "https://www.mongodb.com/",
  },
  {
    name: "Docker (Containerization)",
    url: "https://www.docker.com/",
  },
  {
    name: "Postman (API Testing)",
    url: "https://www.postman.com/",
  },
];

export default function TechnologiesUsed() {
  return (
    <Container sx={{ textAlign: "left", p: 2, mt: 4 }}>
      <Typography variant="h6"> Technologies Used </Typography>
      <Typography variant="body1">
        This project uses the following technologies:
      </Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1" component="div">
          {technologies.map((tech, index) => (
            <Container key={index} sx={{ mt: 1 }}>
              {index + 1}.{" "}
              <Link href={tech.url} target="_blank" rel="noopener noreferrer">
                {tech.name}
              </Link>
            </Container>
          ))}
        </Typography>
      </Paper>
    </Container>
  );
}
