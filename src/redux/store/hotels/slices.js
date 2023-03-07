import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: false,
  data: [],
  favorite: [],
};

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    getFetchHotelsData(state, action) {
      state.data = action.payload.map((el) => el);
    },

    getFavoriteHotel(state, action) {
      const findItem = state.favorite.find((obj) => obj.hotelId === action.payload.hotelId);
      if (!findItem) {
        state.favorite.push(action.payload);
      }
    },
    deleteFavoriteHotel(state, action) {
      state.favorite = state.favorite.filter((item) => item.hotelId !== action.payload.hotelId);
    },
    getFilterRating(state, action) {
      if (action.payload) {
        state.favorite = state.favorite.sort((a, b) => b.stars - a.stars);
      } else if (!action.payload) {
        state.favorite = state.favorite.sort((a, b) => a.stars - b.stars);
      }
    },
    getFilterPrice(state, action) {
      if (action.payload) {
        state.favorite = state.favorite.sort((a, b) => b.priceAvg - a.priceAvg);
      } else if (!action.payload) {
        state.favorite = state.favorite.sort((a, b) => a.priceAvg - b.priceAvg);
      }
    },
  },
});

export const {
  getFetchHotelsData,
  getFetchError,
  getFavoriteHotel,
  deleteFavoriteHotel,
  getFilterRating,
  getFilterPrice,
} = hotelsSlice.actions;

export default hotelsSlice.reducer;
