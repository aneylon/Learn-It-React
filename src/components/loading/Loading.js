import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h5">...Loading...</Typography>
    </Box>
  );
};
export default Loading;
