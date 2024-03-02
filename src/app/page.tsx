"use client";

import GetJoke from "../app/components/GetJoke";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container fixed sx={{ textAlign: "center" }}>
      <GetJoke />
    </Container>
  );
}
