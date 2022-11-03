import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { LoginProps } from './types';

const login = createAsyncThunk<string | null, LoginProps, { rejectValue: AxiosError }>(
  'auth/login',
  async ({ email, password, isRemembered }, { rejectWithValue }) => new Promise((resolve) => {
    axios.post('/login', { email, password })
      .then((res) => {
        const { token } = res.data;
        if (token && isRemembered) {
          localStorage.setItem('token', token);
        }
        resolve(token || null);
      })
      .catch((e: AxiosError) => {
        resolve(rejectWithValue(e));
      });
  }),
);

export {
  login,
};
