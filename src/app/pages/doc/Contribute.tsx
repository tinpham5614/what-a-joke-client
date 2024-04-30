import { Container, Typography, Paper } from "@mui/material";
import React from "react";

const contributeSteps = [
  "Fork the repository: ",
  "Clone the repository",
  "Create a new branch",
  "Make your changes and add to staging",
  "Commit your changes",
  "Push your changes",
  "Create a pull request",
  "Wait for review",
  "Merge your changes",
  "Celebrate! 🎆",
];

const contributeLinks = [
  "https://github.com/tinpham5614/what-a-joke-client",
  "For HTTPS: git clone https://github.com/tinpham5614/what-a-joke-client.git",
  "git checkout -b your-branch-name",
  "git add .",
  "git commit -m 'Your commit message'",
  "git push origin your-branch-name",
  "Create a pull request on GitHub",
  "Wait for someone to review your changes",
  "Once approved, merge your changes",
  "Celebrate your contribution to the project!",
];

export default function Contribute() {
  return (
    <Container sx={{ textAlign: "left", p: 2, mt: 4 }}>
      <Typography variant="h6"> How to Contribute </Typography>
      <Typography variant="h6">
        Follow these steps to contribute to the project:
      </Typography>
      <Container sx={{ mt: 2 }}>
        {contributeSteps.map((step, index) => (
          <Container key={index}>
            <Typography variant="body1">
              {index + 1}. {step}
            </Typography>
            <Paper key={index} sx={{ p: 2, mt: 2 }}>
              <Typography variant="body1">{contributeLinks[index]}</Typography>
            </Paper>
          </Container>
        ))}
      </Container>
    </Container>
  );
}
