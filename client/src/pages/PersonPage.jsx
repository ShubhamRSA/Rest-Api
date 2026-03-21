import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchPersons,
  addPerson,
  updatePersonData,
  removePersonData,
} from "../redux/slices/personSlice";
import { fetchCars } from "../redux/slices/carSlice";
import { PersonList } from "../components/PersonList";
import { PersonModal } from "../components/PersonModal";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const PersonPage = () => {
  const dispatch = useDispatch();
  const { persons, loading } = useSelector((state) => state.person);
  const { cars } = useSelector((state) => state.car);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchCars());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedPerson(null);
    setModalOpen(true);
  };

  const handleEdit = (person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleDelete = async (personId) => {
    await dispatch(removePersonData(personId)).unwrap();
    // Refetch data after delete
    dispatch(fetchPersons());
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedPerson) {
        await dispatch(
          updatePersonData({
            id: selectedPerson.person_uid,
            personData: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(addPerson(formData)).unwrap();
      }
      // Refetch data after add or update
      dispatch(fetchPersons());
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
        <Typography variant="h4">Persons</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Person
        </Button>
      </Box>

      {loading ? (
        <LoadingSpinner message="Loading persons..." />
      ) : (
        <PersonList
          persons={persons}
          cars={cars}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={loading}
        />
      )}

      <PersonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title={selectedPerson ? "Edit Person" : "Add Person"}
        initialData={selectedPerson}
        isLoading={loading}
      />
    </Box>
  );
};
