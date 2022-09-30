import { Box, Card, Tab, Container, TextField, Button } from "@mui/material";
import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useForm } from "react-hook-form";

const Login = () => {
  const [value, setValue] = React.useState("1");
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
  } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container style={{ maxWidth: "450px" }}>
      <Card variant="outlined" sx={{ marginTop: 15 }}>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Login" value="1" />
                <Tab label="Sign up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
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
                  helperText={
                    errors.loginEmail ? errors.loginEmail.message : ""
                  }
                  error={!!errors.loginEmail}
                  InputLabelProps={{ shrink: true }}
                  {...register("loginEmail", {
                    required: "email required",
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
                  helperText={
                    errors.loginPassword ? errors.loginPassword.message : ""
                  }
                  InputLabelProps={{ shrink: true }}
                  {...register("loginPassword", {
                    required: "password required",
                    // ToDo : add password requirements
                  })}
                />
                <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
                  Login
                </Button>
              </form>
            </TabPanel>
            <TabPanel value="2">
              <form
                onSubmit={handleSubmit((data) => {
                  console.log("signup", data);
                })}
              >
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="user@domain.com"
                  type="email"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="5RedRats!"
                  type="password"
                  InputLabelProps={{ shrink: true }}
                />
                <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
                  Sign up
                </Button>
              </form>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
