import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Joke = {
  joke: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const useCreateJoke = () => {
  const { register, handleSubmit, reset, watch } = useForm<Joke>();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  const onSubmit: SubmitHandler<Joke> = async (data) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiUrl}/jokes/create`, {
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
        return;
      }
      setSuccess(message);
      reset();
      // close the dialog
      setOpen(false);
    } catch (error) {
      setError("Failed to submit joke!");
    }
  };
  return {
    register,
    handleSubmit,
    reset,
    watch,
    open,
    error,
    success,
    handleClickOpen,
    handleClose,
    onSubmit,
  };
};
