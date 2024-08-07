import {
  Container,
  Button,
  OutlinedInput,
  Dialog,
  DialogContent,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import FloatingActionButtons from "../components/FloatingButton";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { useCreateJoke } from "../hooks/useCreateJoke";

export default function CreateNewJoke() {
  const {
    register,
    handleSubmit,
    watch,
    open,
    error,
    success,
    handleClickOpen,
    handleClose,
    onSubmit,
  } = useCreateJoke();

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
