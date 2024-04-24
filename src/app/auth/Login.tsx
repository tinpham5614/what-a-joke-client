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
const message = {
  fieldRequired: "Email and password are required",
  passwordError: "Password must be at least 6 characters long",
  emailInvalid: "Invalid email",
  success: "Login successful",
};
const mockUser = {
  email: "user@gmail.com",
  password: "qweqwe",
};
export default function Login() {
  const { register, handleSubmit, reset, watch } = useForm<LoginData>();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleLogin: SubmitHandler<LoginData> = async (data) => {
    if (!data.email || !data.password) {
      setError(message.fieldRequired);
      return;
    }

    if (!data.email.includes("@")) {
      setError(message.emailInvalid);
      return;
    }

    if (data.password.length < 6) {
      setError(message.passwordError);
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
            {...register("email")}
            value={mockUser.email} // for development purposes
          />
          <TextField
            id="outlined-required"
            sx={{ display: "flex", marginTop: 2, width: "100%" }}
            placeholder="Password"
            type="password"
            {...register("password")}
            value={mockUser.password} // for development purposes
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
