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
import { useSignOut } from "../../hooks/useSignOut";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
  const { signOut } = useSignOut();
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOut();
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
            {user && (
              <MenuItem
                component={RouterLink}
                to="/admin"
                onClick={handleClose}
              >
                Admin
              </MenuItem>
            )}
            {user && (
              <MenuItem
                component={RouterLink}
                to="/profile"
                onClick={handleClose}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
          <Typography variant="h4" sx={{ pl: 2 }}>
            Learn It
            <MenuBookIcon sx={{ ml: 2 }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
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
            {user && (
              <Button
                component={RouterLink}
                to="/admin"
                sx={{ color: "white" }}
              >
                Admin
              </Button>
            )}
            {user && (
              <Button
                component={RouterLink}
                to="/profile"
                sx={{ color: "white" }}
              >
                Profile
              </Button>
            )}
          </Box>
          {user ? (
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
