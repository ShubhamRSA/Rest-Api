import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { fetchCarById } from "../redux/slices/carSlice";

export const CarDetailPage = () => {
  const { carId } = useParams();
  const dispatch = useDispatch();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (carId) {
      setLoading(true);
      setError(null);
      dispatch(fetchCarById(carId))
        .unwrap()
        .then((data) => {
          setCar(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err || "Failed to fetch car details");
          setLoading(false);
        });
    }
  }, [carId, dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {car && !loading && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Car Details
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              ID
            </Typography>
            <Typography
              variant="body1"
              sx={{
                wordBreak: "break-all",
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                fontFamily: "monospace",
              }}
            >
              {car.car_uid}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              Make
            </Typography>
            <Typography variant="body1">{car.make}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              Model
            </Typography>
            <Typography variant="body1">{car.model}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              Price
            </Typography>
            <Typography variant="body1">
              ${parseFloat(car.price).toFixed(2)}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
