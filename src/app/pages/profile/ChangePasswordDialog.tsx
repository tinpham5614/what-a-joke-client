"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
    setError(null);
    setSuccess(null);

    if (!isAuthenticated) {
      setError("You must be logged in to change your password");
      return;
    }

    const validation = InputValidation(data);
    if (validation) {
      setError(validation);
      return;
    }

    try {
      // api and token
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL + "/change-password";
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const { message } = await response.json();
      if (!response.ok) {
        setError(message);
        throw new Error(message);
      }
      setSuccess(message);
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
              onClick={handleClickOpen}
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
