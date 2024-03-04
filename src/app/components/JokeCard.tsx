import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

interface Joke {
  joke: string;
  setup: string;
  delivery: string;
}

export default function BasicCard(joke: Joke) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Typography variant="h6">{joke.setup}</Typography>
            <Typography variant="h6">{joke.delivery}</Typography>
          </div>
          <div>
            <Typography variant="h6">{joke.joke}</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
