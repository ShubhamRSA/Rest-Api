import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { fetchPersonById } from "../redux/slices/personSlice";
import { fetchCarById } from "../redux/slices/carSlice";

export const PersonDetailPage = () => {
  const { personId } = useParams();
  const dispatch = useDispatch();
  const [person, setPerson] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (personId) {
      setLoading(true);
      setError(null);
      dispatch(fetchPersonById(personId))
        .unwrap()
        .then((data) => {
          setPerson(data);
          setLoading(false);
          // Fetch car details if car_uid exists
          if (data.car_uid) {
            dispatch(fetchCarById(data.car_uid))
              .unwrap()
              .then((carData) => {
                setCar(carData);
              })
              .catch((err) => {
                console.error("Failed to fetch car details:", err);
              });
          }
        })
        .catch((err) => {
          setError(err || "Failed to fetch person details");
          setLoading(false);
        });
    }
  }, [personId, dispatch]);

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

      {person && !loading && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Person Details
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
              {person.person_uid}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              First Name
            </Typography>
            <Typography variant="body1">{person.first_name}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              Last Name
            </Typography>
            <Typography variant="body1">{person.last_name}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              Email
            </Typography>
            <Typography variant="body1">{person.email || "N/A"}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              Car
            </Typography>
            <Typography variant="body1">
              {car
                ? `${car.make} ${car.model}`
                : person.car_uid
                  ? "Loading..."
                  : "Not assigned"}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
