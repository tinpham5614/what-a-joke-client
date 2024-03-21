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
import FavoriteIcon from "@mui/icons-material/Favorite";
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
  const [countFavorite, setCountFavorite] = useState(0);
  const isFav = useRef(false);

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

  const shouldFetch = useRef(true); // Used to prevent multiple fetches
  useEffect(() => {
    // Fetch only on mount or when specific dependencies change
    if (shouldFetch.current) {
      shouldFetch.current = false; // Prevent multiple fetches
      // fetchJoke();
    }
  }, [shouldFetch]); // Include necessary dependencies

  const handleFavorite = () => {
    if (isFav.current) {
      setCountFavorite((prev) => prev - 1); // If it's already a favorite, remove it
    } else {
      setCountFavorite((prev) => prev + 1); // If it's not a favorite, add it
    }
    isFav.current = !isFav.current;
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="h4">Joke of the day</Typography>
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
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleFavorite}
                >
                  {countFavorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
                <div>
                  <Typography variant="subtitle2">{countFavorite}</Typography>
                </div>
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
