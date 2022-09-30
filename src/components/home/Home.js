import { Box, Toolbar, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 5, marginLeft: 15 }}>
      <Toolbar />
      <Typography>Homey Home</Typography>
    </Box>
  );
};
export default Home;
