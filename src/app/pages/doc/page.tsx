import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import TechnologiesUsed from "./TechnologiesUsed";
import Contribute from "./Contribute";

export default function Documentation() {
  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="h4"> What a Joke Documentation </Typography>

      <Container sx={{ textAlign: "left", p: 2, mt: 4 }}>
        <Typography variant="body1">
          What a Joke is a web application that allows users to create, view,
          and share jokes. Users can create an account, log in, and create their
          own jokes. They can also view and react jokes created by other users.
        </Typography>

      </Container>
      <TechnologiesUsed />
      <Contribute />
    </Container>
  );
}
