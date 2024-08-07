import { Container, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import JokeCard from "../components/JokeCard";
import { useUserJokes } from "../hooks/useUserJokes";

export default function GetUsersJokes() {
  const { jokes, loading, error, isAuthenticated } = useUserJokes();

  if (loading) {
    return <LinearProgress sx={{ mt: 2, width: "100%" }} />;
  }

  if (!isAuthenticated) {
    return (
      <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4">You need to login to see your jokes.</Typography>
      </Container>
    );
  }

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      {error && <Typography color="error">{error}</Typography>}
      {!loading && jokes.length === 0 && (
        <Typography>You haven&apos;t posted any jokes yet.</Typography>
      )}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {jokes.map((joke, index) => (
          <JokeCard
            key={index}
            joke={joke.joke}
            _id={""} // Placeholder value; adjust as needed
            favoriteCount={joke.favoriteCount}
            isFavorite={false}
            onFavorite={() => {}} // Placeholder function; adjust as needed
          />
        ))}
      </Stack>
    </Container>
  );
}
