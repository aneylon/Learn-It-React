import { TextField, Button } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("login", data);
      })}
    >
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        label="Email"
        name="loginEmail"
        placeholder="user@domain.com"
        type="email"
        helperText={errors.loginEmail ? errors.loginEmail.message : ""}
        error={!!errors.loginEmail}
        InputLabelProps={{ shrink: true }}
        {...register("loginEmail", {
          required: "Email required",
          // ToDo: add email requirements
        })}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Password"
        name="loginPassword"
        placeholder="5RedRats!"
        type="password"
        error={!!errors.loginPassword}
        helperText={errors.loginPassword ? errors.loginPassword.message : ""}
        InputLabelProps={{ shrink: true }}
        {...register("loginPassword", {
          required: "Password required",
          // ToDo : add password requirements
        })}
      />
      <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
        Login
      </Button>
    </form>
  );
};

export default Signin;
