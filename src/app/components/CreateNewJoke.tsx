import { Container, Button, OutlinedInput } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { SubmitHandler, useForm } from "react-hook-form";

type Joke = {
  joke: string;
};

export default function CreateNewJoke() {
  const { register, handleSubmit, reset } = useForm<Joke>();

  const onSubmit: SubmitHandler<Joke> = (data) => {
    // TODO: send data to the server here
    console.log(data);
    reset();
  };

  return (
    <Container fixed sx={{ textAlign: "end" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OutlinedInput
          sx={{ display: "block" }}
          placeholder="Do you have a joke? Share it here!"
          rows={4}
          multiline
          {...register("joke")}
          endAdornment={
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              Send
            </Button>
          }
        />
      </form>
    </Container>
  );
}
