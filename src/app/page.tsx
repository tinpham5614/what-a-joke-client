"use client";

import GetRandomJoke from "./dashboard/GetRandomJoke";
import { Box, Divider, Grid } from "@mui/material";
import CreateNewJoke from "./dashboard/CreateNewJoke";
import Login from "./dashboard/Login";
import GetJokes from "./dashboard/GetJokes";

export default function Home() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={3}>
        <Login />
      </Grid>
      <Grid item xs={6}>
        <GetJokes />
      </Grid>
      <Grid item xs={3}>
        <GetRandomJoke />
        <Divider sx={{ marginY: 2 }} />
        <Grid
          item
          xs={12}
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            margin: 2,
          }}
        >
          <CreateNewJoke />
        </Grid>
      </Grid>
    </Grid>
  );
}
