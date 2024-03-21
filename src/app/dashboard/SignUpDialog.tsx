import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@mui/material";

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

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
    formState: { errors },
  } = useForm<SignUpData>();
  const handleSignUp: SubmitHandler<SignUpData> = async (data) => {
    const apiUrl = "http://localhost:3000/api/auth/signup";
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
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 360 }}
        >
          <form onSubmit={handleSubmit(handleSignUp)}>
            <TextField
              id="outlined-required"
              required
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <Typography variant="caption" color="error">
                First Name is required
              </Typography>
            )}
            <TextField
              id="outlined-required"
              required
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Last Name"
              {...register("lastName")}
            />
            <TextField
              id="outlined-required"
              required
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            <TextField
              id="outlined-required"
              required
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <TextField
              id="outlined-required"
              required
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword")}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
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
