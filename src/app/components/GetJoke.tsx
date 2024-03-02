import { Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

  interface Joke {
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
      const apiURL = "https://v2.jokeapi.dev/joke/Programming?type=twopart";
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

  const handleClick = () => {
    fetchJoke();
  };

  return (
    <Container fixed sx={{ textAlign: "center" }}>
      <Button onClick={handleClick} variant="contained" color="primary">
        Get A Joke
      </Button>
      <Stack spacing={2} sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {loading ? <CircularProgress /> : null}
        {error ? <Typography color="error">{error}</Typography> : null}
        {data ? (
          <div>
            <Typography variant="h6">{data.setup}</Typography>
            <Typography variant="h6">{data.delivery}</Typography>
          </div>
        ) : null}
      </Stack>
    </Container>
  );
}
