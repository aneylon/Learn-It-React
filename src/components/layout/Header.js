import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <MenuBookIcon />
          <Typography variant="h4" sx={{ pl: 2 }}>
            Learn It
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button component={RouterLink} to="/" sx={{ color: "white" }}>
              Home
            </Button>
            <Button component={RouterLink} to="/about" sx={{ color: "white" }}>
              About
            </Button>
            <Button component={RouterLink} to="/admin" sx={{ color: "white" }}>
              Admin
            </Button>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
