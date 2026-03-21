import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Navbar = () => {
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
              REST API Client
            </Button>
          </Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
