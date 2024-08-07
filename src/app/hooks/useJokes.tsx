import { useEffect, useState } from "react";

interface Joke {
  _id: string;
  joke: string;
  favoriteCount: number;
  isFavorite: boolean;
}

const apiURL = `${process.env.NEXT_PUBLIC_JOKE_API_URL}`;

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch a joke from the API
  const fetchJoke = async () => {
    // stop loading and reset state
    setLoading(true);
    setJokes([]);
    setError("");

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
    } catch (err) {
      setError("Error fetching joke");
      console.error("Error fetching joke", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedJokes = jokes.map((joke) => {
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
    });
    setJokes(updatedJokes);
  };

  return { jokes, loading, error, fetchJoke, toggleFavorite };
};
