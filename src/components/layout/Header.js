import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleClick}
            sx={{ mr: 2, display: { sx: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem component={RouterLink} to="/" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={RouterLink} to="/about" onClick={handleClose}>
              About
            </MenuItem>
            <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
              Admin
            </MenuItem>
          </Menu>
          <Typography variant="h4" sx={{ pl: 2 }}>
            Learn It
            <MenuBookIcon sx={{ ml: 2 }} />
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
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
