import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

import SignUpDialog from "./SignUpDialog";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

type LoginData = {
  email: string;
  password: string;
};
export default function Login() {
  const { register, handleSubmit, reset, watch } = useForm<LoginData>();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleLogin: SubmitHandler<LoginData> = async (data) => {
    if (!data.email || !data.password) {
      setError("Email and password are required");
      return;
    }

    if (!data.email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const apiUrl = "http://localhost:3000/api/auth/login";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const { message } = await response.json();
        setError(message);
        return;
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      setSuccess("Login successful");
      setError("");
    } catch (error) {
      console.error("There was an error!", error);
    }
    reset();
  };
  return (
    <Container fixed>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            id="outlined-required"
            sx={{ display: "flex", marginTop: 2, width: "100%" }}
            placeholder="Email"
            {...register("email")}
          />
          <TextField
            id="outlined-required"
            sx={{ display: "flex", marginTop: 2, width: "100%" }}
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          {error && <ErrorAlert message={error} />}
          {success && <SuccessAlert message={success} />}
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
            disabled={
              !(watch("email")?.length > 0) || !(watch("password")?.length > 0)
            }
          >
            Login
          </Button>
        </form>
        <SignUpDialog />
      </Paper>
    </Container>
  );
}
