import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { Chip, Typography } from '@mui/material';
import { Span } from 'next/dist/trace';
import { Anchor } from '@mui/icons-material';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form handling
    const { register, handleSubmit, reset } = useForm();
    const handleSignUp = (data: any) => {
        console.log(data);
        reset();
    }

  return (
    <React.Fragment>
    <Typography variant="subtitle2" sx={{ marginTop: 2 }} >
        Don&apos;t have an account? <Typography sx={{ cursor: "pointer", display: "inline", color: "primary.main" }} onClick={handleClickOpen}>Sign Up</Typography>
    </Typography>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", width: 360}}>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <TextField
                id="outlined-required"
                required
                sx={{ display: "flex", marginTop: 2, width: "100%" }}
                placeholder="First Name"
                {...register("firstName")}
            />
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
            <Button variant="contained" type="submit" sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
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