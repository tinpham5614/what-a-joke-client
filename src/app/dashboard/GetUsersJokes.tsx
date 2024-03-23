import { Container, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JokeCard from "../components/JokeCard";
import useAuth from "../hooks/useAuth";

interface Joke {
  joke: string;
  favoriteCount: number;
}

export default function GetUsersJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchJokes = async () => {
      if (isAuthenticated && user?.sub) {
        setLoading(true);
        try {
          const apiURL = `${process.env.NEXT_PUBLIC_JOKE_API_URL}/user/${user.sub}`;
          const token = localStorage.getItem("token") || "";
          const res = await fetch(apiURL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) {
            throw new Error("Error fetching jokes.");
          }
          const jokesData = await res.json();
          setJokes(jokesData);
        } catch (err) {
          setError("Error fetching jokes.");
          console.error("Error fetching jokes", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJokes();
  }, [isAuthenticated, user?.sub]); // Add dependencies to ensure this effect runs again if these values change

  if (!isAuthenticated) {
    return (
      <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4">You need to login to see your jokes.</Typography>
      </Container>
    );
  }

  return (
    <Container fixed maxWidth="md" sx={{ textAlign: "center" }}>
      {loading && <LinearProgress sx={{ mt: 2, width: "100%" }} />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && jokes.length === 0 && (
        <Typography>You have&apos;t posted any jokes yet.</Typography>
      )}
      {jokes.map((joke, index) => (
        <JokeCard
          key={index}
          joke={joke.joke}
          _id={""} // Assuming _id is not available in the Joke interface; adjust as needed
          favoriteCount={joke.favoriteCount}
          isFavorite={false}
          onFavorite={() => {}} // No-op if favoriting is not applicable
        />
      ))}
    </Container>
  );
}
