import { Container, Typography, Paper } from "@mui/material";
import React from "react";

export default function TechnologiesUsed() {
  return (
    <Container sx={{ textAlign: "left", p: 2, mt: 4 }}>
      <Typography variant="h6"> Technologies Used </Typography>
      <Typography variant="body1">
        This project uses the following technologies:
      </Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1">
          - NextJS (Frontend)
          <br />
          - NestJS (Backend)
          <br />
          - MongoDB (Database)
          <br />- Docker (Containerization)
        </Typography>
      </Paper>
    </Container>
  );
}
