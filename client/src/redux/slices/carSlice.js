import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiService from "../../services/api.js";

export const fetchCars = createAsyncThunk(
  "car/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getCars();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cars",
      );
    }
  },
);

export const fetchCarById = createAsyncThunk(
  "car/fetchCarById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiService.getCar(id);
      return data[0] || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch car",
      );
    }
  },
);

export const addCar = createAsyncThunk(
  "car/addCar",
  async (carData, { rejectWithValue }) => {
    try {
      const data = await apiService.createCar(carData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add car",
      );
    }
  },
);

export const updateCarData = createAsyncThunk(
  "car/updateCarData",
  async ({ id, carData }, { rejectWithValue }) => {
    try {
      const data = await apiService.updateCar(id, carData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update car",
      );
    }
  },
);

export const removeCarData = createAsyncThunk(
  "car/removeCarData",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiService.deleteCar(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete car",
      );
    }
  },
);

const initialState = {
  cars: [],
  selectedCar: null,
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all cars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch car by ID
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add car
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update car
      .addCase(updateCarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCarData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cars.findIndex(
          (c) => c.car_uid === action.payload.car_uid,
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
        state.selectedCar = action.payload;
      })
      .addCase(updateCarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete car
      .addCase(removeCarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCarData.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((c) => c.car_uid !== action.payload);
      })
      .addCase(removeCarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedCar } = carSlice.actions;
export default carSlice.reducer;
