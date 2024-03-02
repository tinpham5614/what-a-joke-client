import { Button, CircularProgress, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function GetJoke() {
  const [joke, setJoke] = useState("");
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
      const data = await res.json();
      setJoke(data.setup + " " + data.delivery);
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
      <h1>Get a Joke</h1>
      <Button onClick={handleClick} variant="contained" color="primary">
        Get Joke
      </Button>
      <Stack spacing={2} sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {loading ? <CircularProgress /> : null}
        {error ? <p>{error}</p> : null}
        {joke ? <p>{joke}</p> : null}
      </Stack>
    </Container>
  );
}
