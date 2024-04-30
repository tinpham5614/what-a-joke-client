import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ChangePassword from "./ChangePasswordDialog";

export default function Profile() {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h3">Profile</Typography>

      <Grid container spacing={2}>
        <Container sx={{ mt: 4 }}>
          <Typography variant="button">
            <ChangePassword />  
          </Typography>
        </Container>
        <Container sx={{ mt: 4 }}>
          <Button variant="contained">Delete Account</Button>
        </Container>
        <Container sx={{ mt: 4 }}>
          <Button variant="contained">Logout</Button>
        </Container>
      </Grid>
    </Box>
  );
}
