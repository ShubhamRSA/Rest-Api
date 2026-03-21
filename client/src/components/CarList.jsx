import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export const CarList = ({ cars, onEdit, onDelete, isLoading }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCar) {
      onDelete(selectedCar.car_uid);
      setDeleteConfirmOpen(false);
      setSelectedCar(null);
    }
  };

  const handleViewDetails = (carId) => {
    window.open(`/car/${carId}`, "_blank");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Make</strong>
              </TableCell>
              <TableCell>
                <strong>Model</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No cars found
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => (
                <TableRow key={car.car_uid} hover>
                  <TableCell>
                    <Tooltip title={car.car_uid} arrow>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleViewDetails(car.car_uid)}
                        sx={{ cursor: "pointer", textAlign: "left" }}
                        disabled={isLoading}
                      >
                        {car.car_uid.substring(0, 8)}...
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>${parseFloat(car.price).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(car)}
                      disabled={isLoading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(car)}
                      disabled={isLoading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedCar?.make}{" "}
          {selectedCar?.model}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
