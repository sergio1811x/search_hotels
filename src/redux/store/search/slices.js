import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalDays: '',
  city: '',
  dateIn: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getSearchValue(state, action) {
      state.totalDays = action.payload.totalDays;
      state.dateIn = action.payload.dateIn;
      state.city = action.payload.city;
    },
  },
});

export const { getSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
