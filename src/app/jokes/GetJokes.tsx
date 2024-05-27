import { Container, LinearProgress, Stack, Typography, Skeleton, Fade } from "@mui/material";
import React from "react";
import JokeCard from "../components/JokeCard";
import { useJokes } from "../hooks/useJokes";

export default function GetJokes() {
  const { jokes, loading, error, toggleFavorite } = useJokes();

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      {loading && <LinearProgress />}
      {error && (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      )}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {jokes.map((joke) => (
          <JokeCard
            key={joke._id}
            _id={joke._id}
            joke={joke.joke}
            isFavorite={joke.isFavorite}
            favoriteCount={joke.favoriteCount}
            onFavorite={() => toggleFavorite(joke._id)}
          />
        ))}
      </Stack>
    </Container>
  );
}
