import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../utils/interfaces';
import publicAxios from '../../utils/public-axios';
import { store } from '../index';

interface ProductSliceState {
  user: User | null;
  loading: boolean;
  error: null | object;
}

const initialState: ProductSliceState = {
  user: null,
  loading: false,
  error: null,
};

export const getUserBydId = createAsyncThunk(
  'users/:id',
  async () => {
    try {

      const state = store.getState();
      const token = state?.login?.token;

      if (!token) {
        return null;
      }

      const res = await publicAxios.get(`/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const userDetailsSlice = createSlice({
  name: 'user-detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBydId.pending, (state) => {
      // Add user to the state array
      console.log('pending')
      state.loading = true;
    });
    builder.addCase(getUserBydId.fulfilled, (state, action) => {
      console.log('fulfilled')
      state.loading = false;
      state.user = action.payload?.data;
      console.log(action.payload?.data);
    });
    builder.addCase(getUserBydId.rejected, (state) => {
      console.log('rejected')
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default userDetailsSlice;
