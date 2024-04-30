"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";
import useAuth from "@/app/hooks/useAuth";
import InputValidation from "./InputValidation";

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const { isAuthenticated } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form handling
  const { register, handleSubmit, reset, watch } =
    useForm<ChangePasswordData>();
  const handleSignUp: SubmitHandler<ChangePasswordData> = async (data) => {
    if (!isAuthenticated) {
      setError("You must be logged in to change your password");
      return;
    }

    const validation = InputValidation(data);
    if (validation) {
      setError(validation);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL + "/change-password";
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
      handleClose();
    } catch (error) {
      console.error("There was an error!", error);
    }
    reset();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Password
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Change Password</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 360 }}
        >
          <form onSubmit={handleSubmit(handleSignUp)}>
            <TextField
              id="outlined-required"
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Current Password"
              type="password"
              {...register("currentPassword")}
            />
            <TextField
              id="outlined-required"
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="New Password"
              type="password"
              {...register("newPassword")}
            />
            <TextField
              id="outlined-required"
              sx={{ display: "flex", marginTop: 2, width: "100%" }}
              placeholder="Confirm New Password"
              type="password"
              {...register("confirmNewPassword")}
            />
            {error && <ErrorAlert message={error} />}
            {success && <SuccessAlert message={success} />}
            <Button
              variant="contained"
              type="submit"
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Change Password
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
