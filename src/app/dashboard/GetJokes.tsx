import {
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import JokeCard from "../components/JokeCard";

interface Joke {
  _id: string;
  joke: string;
  favoriteCount: number;
  isFavorite: boolean;
}
const apiURL = "http://localhost:3000/api/jokes/";

export default function GetJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch a joke from the API
  const fetchJoke = async () => {
    setLoading(false);
    try {
      const res = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error fetching joke");
      }
      const jokes = await res.json();
      setJokes(jokes);
      setError("");
      console.log(jokes)
    } catch (err) {
      setError("Error fetching joke");
      console.error("Error fetching joke", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const toggleFavorite = (id: string) => {
    setJokes(
      jokes.map((joke) => {
        if (joke._id === id) {
          return {
            ...joke,
            isFavorite: !joke.isFavorite,
            favoriteCount: joke.isFavorite
              ? joke.favoriteCount - 1
              : joke.favoriteCount + 1,
          };
        }
        return joke;
      })
    );

    const handleShare = () => {
      // TODO: Implement share functionality
    };
  };

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      {loading && <LinearProgress sx={{ mt: 2, width: "100%" }} />}
      {error && <Typography color="error">{error}</Typography>}
      {jokes && jokes.length > 0 ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {jokes.map((joke, index) => (
            <JokeCard
              key={index}
              _id={joke._id}
              joke={joke.joke}
              favoriteCount={joke.favoriteCount}
              isFavorite={joke.isFavorite}
              onFavorite={() => toggleFavorite(joke._id)}
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="h6" sx={{ mt: 2 }}>
          No jokes found
        </Typography>
      )}
    </Container>
  );
}
