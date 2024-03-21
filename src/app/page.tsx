"use client";

import GetRandomJoke from "./components/GetRandomJoke";
import { Container, Divider, Grid } from "@mui/material";
import CreateNewJoke from "./components/CreateNewJoke";
import Login from "./components/Login";
import GetJokes from "./components/GetJokes";

export default function Home() {
  return (
    <Container
      fixed
      maxWidth="xl"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={3}>
          <Login />
        </Grid>
        <Grid item xs={6}>
          <CreateNewJoke />
          <Divider sx={{ marginY: 2 }} />
          {/* Replace with GetJoke from backend */}
          <GetJokes />
        </Grid>
        <Grid item xs={3}>
          <GetRandomJoke />
        </Grid>
      </Grid>
    </Container>
  );
}
