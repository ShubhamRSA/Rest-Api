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

export const PersonList = ({
  persons,
  cars = [],
  onEdit,
  onDelete,
  isLoading,
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleDeleteClick = (person) => {
    setSelectedPerson(person);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPerson) {
      onDelete(selectedPerson.person_uid);
      setDeleteConfirmOpen(false);
      setSelectedPerson(null);
    }
  };

  const handleViewDetails = (personId) => {
    window.open(`/person/${personId}`, "_blank");
  };

  const getCarInfo = (carUid) => {
    if (!carUid) return "NA";
    const car = cars.find((c) => c.car_uid === carUid);
    return car ? `${car.make} ${car.model}` : "NA";
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
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Car</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No persons found
                </TableCell>
              </TableRow>
            ) : (
              persons.map((person) => (
                <TableRow key={person.person_uid} hover>
                  <TableCell>
                    <Tooltip title={person.person_uid} arrow>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleViewDetails(person.person_uid)}
                        sx={{ cursor: "pointer", textAlign: "left" }}
                        disabled={isLoading}
                      >
                        {person.person_uid.substring(0, 8)}...
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{person.first_name}</TableCell>
                  <TableCell>{person.last_name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{getCarInfo(person.car_uid)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(person)}
                      disabled={isLoading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(person)}
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
          Are you sure you want to delete {selectedPerson?.first_name}{" "}
          {selectedPerson?.last_name}?
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
