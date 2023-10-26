import { createSlice } from "@reduxjs/toolkit";
import { greyShoesImages, productsArray } from "../utilis/productsArray";

const initialState = {
  currentImageIndex: 0,
  currentImageSet: greyShoesImages[0],
  selectedSize: -1,
  border: 0,
  currentPrice: productsArray[0][1],
};

const imageIndexSlice = createSlice({
  name: "imageIndexSlide",
  initialState: initialState,
  reducers: {
    imageClick: (state, action) => {
      state.currentImageIndex = action.payload;
    },

    decrementImageIndex: (state) => {
      state.currentImageIndex =
        state.currentImageIndex === 0
          ? state.currentImageSet.length - 1
          : state.currentImageIndex - 1;
    },
    incrementImageIndex: (state) => {
      state.currentImageIndex =
        state.currentImageIndex === state.currentImageSet.length - 1
          ? 0
          : state.currentImageIndex + 1;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize =
        state.selectedSize === action.payload ? -1 : action.payload;
    },

    setBorder: (state, action) => {
      state.border = action.payload;
    },
    setChange: (state, action) => {
      const { imageSet, price } = action.payload;
      state.currentImageSet = imageSet;
      state.currentImageIndex = 0;
      state.currentPrice = price;
    },
  },
});

export const {
  imageClick,
  decrementImageIndex,
  incrementImageIndex,
  setSelectedSize,
  setBorder,
  setChange,
} = imageIndexSlice.actions;

export default imageIndexSlice.reducer;
