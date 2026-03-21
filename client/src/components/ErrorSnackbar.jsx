import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearError as clearPersonError } from "../redux/slices/personSlice";
import { clearError as clearCarError } from "../redux/slices/carSlice";

export const ErrorSnackbar = () => {
  const personError = useSelector((state) => state.person.error);
  const carError = useSelector((state) => state.car.error);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const error = personError || carError;

  useEffect(() => {
    if (error) {
      setMessage(error);
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(clearPersonError());
    dispatch(clearCarError());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
