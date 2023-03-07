import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  users: [
    {
      email: 'test@gmail.com',
      password: '12345678',
    },
    {
      email: 'admin@mail.com',
      password: '12345678',
    },
  ],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorization(state, action) {
      const email = state.users.map((el) => el.email);
      const password = state.users.map((el) => el.password);

      if (
        email.includes(action.payload.valueLogin) === true &&
        password.includes(action.payload.valuePassword) === true
      ) {
        state.isAuth = true;
        localStorage.setItem('Auth', JSON.stringify(state.isAuth));
      }
    },
    logout(state, action) {
      state.isAuth = action.payload;
      localStorage.setItem('Auth', JSON.stringify(action.payload));
    },
  },
});

export const { authorization, logout } = authSlice.actions;

export default authSlice.reducer;
