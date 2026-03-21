import { Box, Container } from "@mui/material";
import { Navbar } from "./Navbar";
import { ErrorSnackbar } from "./ErrorSnackbar";

export const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ErrorSnackbar />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};
