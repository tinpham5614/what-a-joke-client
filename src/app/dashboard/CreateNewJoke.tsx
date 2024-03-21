import { Container, Button, OutlinedInput } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { SubmitHandler, useForm } from "react-hook-form";

type Joke = {
  joke: string;
};

export default function CreateNewJoke() {
  const { register, handleSubmit, reset } = useForm<Joke>();

  const onSubmit: SubmitHandler<Joke> = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/jokes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
