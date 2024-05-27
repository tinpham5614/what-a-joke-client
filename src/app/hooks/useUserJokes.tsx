import { useState, useEffect } from "react";
import useAuth from "./useAuth";

interface Joke {
  joke: string;
  favoriteCount: number;
}

export const useUserJokes = () => {
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
  }, [isAuthenticated, user?.sub]);

  return { jokes, loading, error, isAuthenticated };
};
