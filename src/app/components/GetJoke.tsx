import { Button, Container } from "@mui/material";
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
  }

  return (
    <Container fixed sx={{ textAlign: "center" }}>
      <h1>Get a Joke</h1>
      <Button onClick={handleClick} variant="contained" color="primary">
        Get Joke
        </Button>
        {joke && <p>{joke}</p>}
    </Container>
  );
}
