import { Component } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 80,
                color: "error.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Oops! Something went wrong
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ mb: 3, mt: 2 }}
            >
              We encountered an unexpected error. Please try again or contact
              support if the problem persists.
            </Typography>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Error Details (Development Only):
                </Typography>
                <Typography
                  variant="code"
                  component="pre"
                  sx={{
                    fontSize: "0.75rem",
                    overflow: "auto",
                    mt: 1,
                  }}
                >
                  {this.state.error.toString()}
                </Typography>
                {this.state.errorInfo && (
                  <Typography
                    variant="code"
                    component="pre"
                    sx={{
                      fontSize: "0.75rem",
                      overflow: "auto",
                      mt: 1,
                    }}
                  >
                    {this.state.errorInfo.componentStack}
                  </Typography>
                )}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => (window.location.href = "/")}
              >
                Go Home
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
