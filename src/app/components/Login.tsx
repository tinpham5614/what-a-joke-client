import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import SignUpDialog from "./SignUpDialog";

type UserInfo = {
  email: string;
  password: string;
};
export default function Login() {
  const { register, handleSubmit, reset } = useForm<UserInfo>();

  const handleLogin = (data: UserInfo) => {
    // TODO: send data to the server here to login
    console.log(data);
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
          <SignUpDialog />
        </form>
      </Paper>
    </Container>
  );
}
