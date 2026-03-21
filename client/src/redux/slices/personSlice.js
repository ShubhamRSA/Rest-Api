import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiService from "../../services/api.js";

export const fetchPersons = createAsyncThunk(
  "person/fetchPersons",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getPersons();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch persons",
      );
    }
  },
);

export const fetchPersonById = createAsyncThunk(
  "person/fetchPersonById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiService.getPerson(id);
      return data[0] || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch person",
      );
    }
  },
);

export const addPerson = createAsyncThunk(
  "person/addPerson",
  async (personData, { rejectWithValue }) => {
    try {
      const data = await apiService.createPerson(personData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add person",
      );
    }
  },
);

export const updatePersonData = createAsyncThunk(
  "person/updatePersonData",
  async ({ id, personData }, { rejectWithValue }) => {
    try {
      const data = await apiService.updatePerson(id, personData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update person",
      );
    }
  },
);

export const removePersonData = createAsyncThunk(
  "person/removePersonData",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiService.deletePerson(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete person",
      );
    }
  },
);

const initialState = {
  persons: [],
  selectedPerson: null,
  loading: false,
  error: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all persons
      .addCase(fetchPersons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.persons = action.payload;
      })
      .addCase(fetchPersons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch person by ID
      .addCase(fetchPersonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPerson = action.payload;
      })
      .addCase(fetchPersonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add person
      .addCase(addPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPerson.fulfilled, (state, action) => {
        state.loading = false;
        state.persons.push(action.payload);
      })
      .addCase(addPerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update person
      .addCase(updatePersonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.persons.findIndex(
          (p) => p.person_uid === action.payload.person_uid,
        );
        if (index !== -1) {
          state.persons[index] = action.payload;
        }
        state.selectedPerson = action.payload;
      })
      .addCase(updatePersonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete person
      .addCase(removePersonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePersonData.fulfilled, (state, action) => {
        state.loading = false;
        state.persons = state.persons.filter(
          (p) => p.person_uid !== action.payload,
        );
      })
      .addCase(removePersonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedPerson } = personSlice.actions;
export default personSlice.reducer;
