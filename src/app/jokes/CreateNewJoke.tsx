import {
  Container,
  Button,
  OutlinedInput,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { SubmitHandler, useForm } from "react-hook-form";
import FloatingActionButtons from "../components/FloatingButton";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

type Joke = {
  joke: string;
};

export default function CreateNewJoke() {
  const { register, handleSubmit, reset, watch } = useForm<Joke>();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Joke> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_JOKE_API_URL + "/create";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const { message } = await res.json();
        setError(message);
        return;
      }
      setSuccess("Joke created successfully");
      setError("");
      handleClose();
    } catch (err) {
      console.error("Error creating joke", err);
    }
  };

  return (
    <>
      <Container onClick={handleClickOpen}>
        <FloatingActionButtons />
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 550 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <OutlinedInput
              sx={{ display: "block" }}
              placeholder="Do you have a joke? Share it here!"
              rows={4}
              multiline
              {...register("joke")}
            />
            {error && <ErrorAlert message={error} />}
            {success && <SuccessAlert message={success} />}
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              sx={{ display: "flex", marginLeft: "auto", marginTop: 2 }}
              disabled={!(watch("joke")?.length > 0)}
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
