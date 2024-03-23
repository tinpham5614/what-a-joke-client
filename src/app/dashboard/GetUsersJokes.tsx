import { Container, LinearProgress, Stack, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import JokeCard from "../components/JokeCard";

interface Joke {
  joke: string;
  favoriteCount: number;
}

export default function GetUsersJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch a joke from the API
  const fetchJoke = async () => {
    setLoading(false);
    try {
      const userId = localStorage.getItem("sub") || "";
      const apiURL = process.env.NEXT_PUBLIC_JOKE_API_URL + `/user/${userId}` || "";
      const token = localStorage.getItem("token") || "";
      const res = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error fetching joke");
      }
      const jokes = await res.json();
      setJokes(jokes);
      setError("");
    } catch (err) {
      setError("Error fetching joke");
      console.error("Error fetching joke", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      {loading && <LinearProgress sx={{ mt: 2, width: "100%" }} />}
      {error && <Typography color="error">{error}</Typography>}
      {jokes && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {jokes.length === 0 && (
            <Typography>You haven&apos;t had one</Typography>
          )}
          {jokes.map((joke, index) => (
            <JokeCard
              key={index}
              joke={joke.joke}
              _id={""}
              favoriteCount={joke.favoriteCount}
              isFavorite={false}
              onFavorite={function (id: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
}
