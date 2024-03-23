import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const CheckTokenValidity = () => {
    const token = localStorage.getItem("token");
    const subRole = localStorage.getItem("subRole");

    if (token && subRole) {
      setIsAuthenticated(true);
      setUserRole(subRole);
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
    useEffect(() => {
      setIsLoading(true);
      CheckTokenValidity();
      setIsLoading(false);
      const handleAuthChange = () => {
        CheckTokenValidity();
      };
      window.addEventListener("storage", handleAuthChange);
      return () => {
        window.removeEventListener("storage", handleAuthChange);
      };
    }, []);
  };
  return { isAuthenticated, userRole, isLoading };
}
