import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import SignUpDialog from "./SignUpDialog";

type LoginData = {
  email: string;
  password: string;
};
export default function Login() {
  const { register, handleSubmit, reset } = useForm<LoginData>();

  const handleLogin:SubmitHandler<LoginData> = async (data) => {
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
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result.token)
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
          <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
        <SignUpDialog />
      </Paper>
    </Container>
  );
}
