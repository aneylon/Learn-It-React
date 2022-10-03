import { Box, Toolbar, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

const NotFound = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 5, marginLeft: 15, textAlign: "center" }}
    >
      <Toolbar />
      <BlockIcon />
      <Typography>Not found</Typography>
    </Box>
  );
};
export default NotFound;
