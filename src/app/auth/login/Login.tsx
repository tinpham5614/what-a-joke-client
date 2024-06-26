import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import SignUpDialog from "../SignUpDialog";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";
import useAuth from "../../hooks/useAuth";
import validateLogin from "./validationLogin";

type LoginData = {
  email: string;
  password: string;
};
const message = {
  fieldRequired: "Email and password are required",
  passwordError: "Password must be at least 6 characters long",
  emailInvalid: "Invalid email",
  success: "Login successful",
};
const mockUser = {
  email: process.env.NEXT_PUBLIC_MOCK_USER_EMAIL,
  password: process.env.NEXT_PUBLIC_MOCK_USER_PASSWORD,
}

export default function Login() {
  const { register, handleSubmit, reset, watch } = useForm<LoginData>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleLogin: SubmitHandler<LoginData> = async (data) => {
    setError(null); // reset error
    setSuccess(null); // reset success

    if (isAuthenticated) {
      setError("You are already logged in");
      return;
    }

    const errorMessage = validateLogin(data);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL + "/login";
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
      const { token, sub } = result;
      localStorage.setItem("token", token);
      localStorage.setItem("sub", sub);
      setSuccess(message.success);
      window.dispatchEvent(new Event("auth-change"));
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
            value={mockUser.email} // mock email for testing
            {...register("email")}
          />
          <TextField
            id="outlined-required"
            sx={{ display: "flex", marginTop: 2, width: "100%" }}
            placeholder="Password"
            value={mockUser.password} // mock password for testing
            type="password"
            {...register("password")}
          />
          {error && <ErrorAlert message={error} />}
          {success && <SuccessAlert message={success} />}
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
            // disabled={
              //   !(watch("email")?.length > 0) || !(watch("password")?.length > 0)
              // }
              >
            Login
          </Button>
        </form>
        <SignUpDialog />
      </Paper>
    </Container>
  );
}
