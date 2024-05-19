"use client";

import GetRandomJoke from "./dashboard/GetRandomJoke";
import { Box, Divider, Grid } from "@mui/material";
import CreateNewJoke from "./dashboard/CreateNewJoke";
import Login from "./auth/login/Login";
import BasicTabs from "./components/NavTabs";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* this is the first column */}
        <Grid item xs={3}>
          <Login />
        </Grid>

        {/* this is the second column */}
        <Grid item xs={6}>
          <BasicTabs />
        </Grid>
        {/* this is the third column */}
        <Grid item xs={3}>
          <GetRandomJoke />
          <Divider sx={{ marginY: 2 }} />
        </Grid>
      </Grid>
      <Box sx={{ 
        position: "fixed",
        bottom: 0,
        right: 0,
        margin: 2,
       }}>
        <CreateNewJoke />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          margin: 2,
        }}
      >
        <ThemeToggle />
      </Box>
    </>
  );
}
