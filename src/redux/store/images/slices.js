import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getCityImages(state, action) {
      state.images = action.payload.items.map((el) => el.pagemap?.cse_image);
    },
  },
});

export const { getCityImages } = imagesSlice.actions;

export default imagesSlice.reducer;
