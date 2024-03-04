import { Box, Button, Container, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

  interface Joke {
    joke: string;
    setup: string;
    delivery: string;
  }
export default function GetJoke() {
  const [data, setData] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch a joke from the API
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const apiURL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist";
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
      fetchJoke();
    }
  }, [shouldFetch]); // Include necessary dependencies

  return (
    <Container fixed sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Joke of the day
      </Typography>
      <Box sx = {{mt: 2, width: "100%"}}>{loading ? <LinearProgress /> : null}</Box>
      <Stack spacing={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {error ? <Typography color="error">{error}</Typography> : null}
        {data ? (
          <div>
            <Typography variant="h6">{data.setup}</Typography>
            <Typography variant="h6">{data.delivery}</Typography>
          </div>
        ) : null}
        {data?.joke ? <div><Typography variant="h6">{data.joke}</Typography></div> : null}
      </Stack>
    </Container>
  );
}
