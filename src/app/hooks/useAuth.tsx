import { useEffect, useState } from "react";

interface User {
  token: string;
  sub: string;
  subRole: string;
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        const sub = localStorage.getItem("sub");
        const subRole = localStorage.getItem("subRole");
        setUser({
          token: token,
          sub: sub as string,
          subRole: subRole as string,
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkTokenValidity(); // Call the function to check the token validity

    const handleStorageChange = () => {
      checkTokenValidity(); // Re-check the token validity if the 'auth-change' event is dispatched
    };

    window.addEventListener("auth-change", handleStorageChange);
    return () => {
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []); // Ensure the effect has no dependencies and thus runs only once on mount

  return { isAuthenticated, user };
}

export default useAuth;
