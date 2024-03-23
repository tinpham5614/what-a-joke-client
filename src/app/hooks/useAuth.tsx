import { useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    token: "",
    sub: "",
    subRole: "",
  });

  const CheckTokenValidity = () => {
    const token = localStorage.getItem("token");
    const subRole = localStorage.getItem("subRole");
    const sub = localStorage.getItem("sub");

    setIsAuthenticated(!!token && !!subRole && !!sub);
    if (token && subRole && sub) {
      setUser({
        token: token || "",
        sub: sub || "",
        subRole: subRole || "",
      });
    } else {
      setIsAuthenticated(false);
      setUser({
        token: "",
        sub: "",
        subRole: "",
      });
    }

    const handleStorageChange = () => {
      CheckTokenValidity();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  };
  return { isAuthenticated, user };
}
