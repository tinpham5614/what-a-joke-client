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

type Joke = {
  joke: string;
};

export default function CreateNewJoke() {
  const { register, handleSubmit, reset } = useForm<Joke>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Joke> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/jokes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Error creating joke");
      } else {
        console.log("Joke created successfully");
        reset();
      }
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
            <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  type="submit"
                  sx={{ display: "flex", marginLeft: "auto", marginTop: 2}}
                  disabled={false}
                >
                  Send
                </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
