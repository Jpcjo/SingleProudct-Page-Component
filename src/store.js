import { configureStore } from "@reduxjs/toolkit";
import imageIndexReducer from "./features/imageIndexSlice";

export const store = configureStore({
  reducer: {
    imageState: imageIndexReducer,
  },
});
