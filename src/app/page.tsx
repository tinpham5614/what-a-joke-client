"use client";

import GetJoke from "../app/components/GetJoke";
import { Container, Divider } from "@mui/material";

export default function Home() {
  return (
    <Container fixed sx={{ textAlign: "center" }}>
      <GetJoke />
      <Divider sx={{ my: 4 }} />
    </Container>
  );
}
