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
import { useSignIn } from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  let rememberedUser = localStorage.getItem("LearnItUser");
  let thing = rememberedUser === null ? "" : rememberedUser;
  let remember = localStorage.getItem("RememberLearnItUser");
  const { signIn, error, isLoading } = useSignIn();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      loginEmail: thing,
      rememberMe: remember === "true",
    },
  });
  const handleSignIn = async (data) => {
    if (data.rememberMe) {
      localStorage.setItem("LearnItUser", data.loginEmail);
      localStorage.setItem("RememberLearnItUser", data.rememberMe);
    } else {
      localStorage.removeItem("RememberLearnItUser");
      localStorage.removeItem("LearnItUser");
    }
    await signIn(data.loginEmail, data.loginPassword);
  };
  useEffect(() => {
    if (isLoading === false) {
      navigate("/");
    }
  }, [isLoading, navigate]);
  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <FormGroup>
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
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          {...register("rememberMe")}
        />
      </FormGroup>
      <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
        Login
      </Button>
    </form>
  );
};

export default Signin;
