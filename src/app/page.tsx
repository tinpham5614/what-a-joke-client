"use client";

import GetJoke from "./components/GetJoke";
import { Container, Divider } from "@mui/material";
import CreateNewJoke from "./components/CreateNewJoke"; 

export default function Home() {
  return (
    <Container fixed maxWidth='md' sx={{ textAlign: "center" }}>
      <GetJoke />
      <Divider sx={{ my: 4 }} />
      <CreateNewJoke />
    </Container>
  );
}
