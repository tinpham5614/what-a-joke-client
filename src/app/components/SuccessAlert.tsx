import React from "react";
import Alert from "@mui/material/Alert";

type SuccessAlertProps = {
  message: string;
};

export default function SuccessAlert({ message }: SuccessAlertProps) {
  return <Alert severity="success">{message}</Alert>;
}
