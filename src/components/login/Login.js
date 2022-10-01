import { Box, Card, Tab, Container } from "@mui/material";
import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Signup from "./Signup";
import Signin from "./Signin";

const Login = () => {
  const [value, setValue] = React.useState("1");

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
              <Signin />
            </TabPanel>
            <TabPanel value="2">
              <Signup />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
