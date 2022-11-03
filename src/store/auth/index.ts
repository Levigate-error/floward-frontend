import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';
import reducers from './reducers';

const initialState: AuthState = {
  user: null,
  initialUserFetch: true,
  backendNoResponse: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
