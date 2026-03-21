import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchCars,
  addCar,
  updateCarData,
  removeCarData,
} from "../redux/slices/carSlice";
import { CarList } from "../components/CarList";
import { CarModal } from "../components/CarModal";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const CarPage = () => {
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.car);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedCar(null);
    setModalOpen(true);
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const handleDelete = async (carId) => {
    await dispatch(removeCarData(carId)).unwrap();
    // Refetch data after delete
    dispatch(fetchCars());
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCar) {
        await dispatch(
          updateCarData({
            id: selectedCar.car_uid,
            carData: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(addCar(formData)).unwrap();
      }
      // Refetch data after add or update
      dispatch(fetchCars());
      // Close modal after successful submit
      setModalOpen(false);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Cars</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Car
        </Button>
      </Box>

      {loading ? (
        <LoadingSpinner message="Loading cars..." />
      ) : (
        <CarList
          cars={cars}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={loading}
        />
      )}

      <CarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title={selectedCar ? "Edit Car" : "Add Car"}
        initialData={selectedCar}
        isLoading={loading}
      />
    </Box>
  );
};
