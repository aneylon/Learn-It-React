import { TextField, Button } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../hooks/useSignUp";

const Signup = () => {
  const { signUp, error, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
  } = useForm();
  const handleSignUp = async (data) => {
    console.log("signup", data);
    await signUp(data.signupEmail, data.signupPassword);
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="email"
        name="signupEmail"
        label="Email"
        placeholder="user@domain.com"
        type="email"
        error={!!errors.signupEmail}
        helperText={errors.signupEmail ? errors.signupEmail.message : ""}
        InputLabelProps={{ shrink: true }}
        {...register("signupEmail", {
          required: "Email required",
          // ToDo: add email requirements
        })}
      />
      <TextField
        fullWidth
        margin="dense"
        id="password"
        name="signupPassword"
        label="Password"
        placeholder="5RedRats!"
        type="password"
        error={!!errors.signupPassword}
        helperText={errors.signupPassword ? errors.signupPassword.message : ""}
        InputLabelProps={{ shrink: true }}
        {...register("signupPassword", {
          required: "Password required",
          // ToDo : add password requirements
        })}
      />
      <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
        Sign up
      </Button>
    </form>
  );
};
export default Signup;
