import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
            >
              REST API CLIENT
            </Button>
          </Box>

          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/persons"
                sx={{ ml: 2 }}
              >
                Persons
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/cars"
                sx={{ ml: 2 }}
              >
                Cars
              </Button>
            </>
          )}

          {isAuthenticated ? (
            <Box sx={{ ml: 2 }}>
              <Button
                color="inherit"
                onClick={handleMenuClick}
                startIcon={<AccountCircleIcon />}
              >
                {user?.username || "User"}
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem disabled>
                  <Typography variant="body2" color="textSecondary">
                    {user?.username}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
