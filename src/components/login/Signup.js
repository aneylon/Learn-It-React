import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";

const Signup = () => {
  const { signUp, error, isLoading } = useSignUp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
  } = useForm();
  const handleSignUp = async (data) => {
    if (data.rememberMe) {
      localStorage.setItem("LearnItUser", data.loginEmail);
      localStorage.setItem("RememberLearnItUser", data.rememberMe);
    } else {
      localStorage.removeItem("RememberLearnItUser");
      localStorage.removeItem("LearnItUser");
    }
    await signUp(data.signupEmail, data.signupPassword);
  };
  useEffect(() => {
    if (isLoading === false) {
      navigate("/");
    }
  }, [isLoading]);
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <FormGroup>
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
          helperText={
            errors.signupPassword ? errors.signupPassword.message : ""
          }
          InputLabelProps={{ shrink: true }}
          {...register("signupPassword", {
            required: "Password required",
            // ToDo : add password requirements
          })}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          {...register("rememberMe")}
        />
      </FormGroup>
      <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
        Sign up
      </Button>
    </form>
  );
};
export default Signup;
