import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./slices/personSlice.js";
import carReducer from "./slices/carSlice.js";

export const store = configureStore({
  reducer: {
    person: personReducer,
    car: carReducer,
  },
});
