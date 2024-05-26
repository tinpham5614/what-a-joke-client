import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import React, { useEffect, useRef, useState } from "react";

interface Joke {
  joke: string;
  setup: string;
  delivery: string;
}
export default function GetRandomJoke() {
  const [data, setData] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch a joke from the API
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const apiURL =
        "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist";
      const res = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error fetching joke");
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError("Error fetching joke");
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      fetchJoke();
    };
  }, []);

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="h5">
        Are you not{" "}
        <Typography
          component="span"
          variant="h5"
          sx={{ p: .5, bgcolor: "primary.main", borderRadius: 1 }}
        >
          entertained?
        </Typography>
      </Typography>
      <Box sx={{ mt: 2, width: "100%" }}>
        {loading ? <LinearProgress /> : null}
      </Box>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {error ? <Typography color="error">{error}</Typography> : null}
            {data ? (
              <div>
                <Typography variant="h6">{data.setup}</Typography>
                <Typography variant="h6">{data.delivery}</Typography>
              </div>
            ) : null}
            {data?.joke ? (
              <div>
                <Typography variant="h6">{data.joke}</Typography>
              </div>
            ) : null}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "end" }}
          >
            {data && !loading ? (
              <CardActions disableSpacing>
                <IconButton aria-label="share" onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </CardActions>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
