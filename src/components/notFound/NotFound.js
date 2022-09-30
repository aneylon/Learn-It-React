import { Box, Toolbar, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 5, marginLeft: 15 }}>
      <Toolbar />
      <Typography>Not found</Typography>
    </Box>
  );
};
export default NotFound;
