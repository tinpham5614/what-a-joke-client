import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import ErrorAlert from "../components/ErrorAlert";
import { error } from 'console';
import SuccessAlert from "../components/SuccessAlert";

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<SignUpData>();
  const handleSignUp: SubmitHandler<SignUpData> = async (data) => {
    if (!data.email || !data.password || !data.confirmPassword) {
      setError("Please fill in all fields");
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

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL + "/signup";
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
      setSuccess("Sign up successful");
      setError("");
      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
    }
    reset();
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
        Don&apos;t have an account?{" "}
        <Typography
          sx={{ cursor: "pointer", display: "inline", color: "primary.main" }}
          onClick={handleClickOpen}
        >
          Sign Up
        </Typography>
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Sign Up</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 360 }}
        >
          <form onSubmit={handleSubmit(handleSignUp)}>
            <TextField
              id="outlined-required"
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            <TextField
              id="outlined-required"
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <TextField
              id="outlined-required"
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword")}
            />
            {error && <ErrorAlert message={error} />}
            {success && <SuccessAlert message={success} />}
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: 2, display: "flex", justifyContent: "center", width: "100%"}}
            >
              Sign Up
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
