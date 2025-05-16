import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setError } from "../../utils/error";
import publicAxios from "../../utils/public-axios";

type User = {
  email: string;
  password: string;
};

type UserInfo = {
  id: string;
  email: string;
  name: string;
  isAdmin: Boolean;
  createdAt: Date;
};

export interface UserSliceState {
  userInfo?: UserInfo | null;
  loading: boolean;
  error: null | object;
}

const initialState: UserSliceState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const userLogin = createAsyncThunk(
  "users/login",
  async (user: User, thunkAPI) => {
    try {
      console.log(user)
      const res = await publicAxios.post("/auth/login", { username: user.email, password: user.password });
      console.log(res)
      if (res.data) {
        toast.success(`Bienvenue 👏 ${res.data.name}`);
        return res.data;
      }
    } catch (error: any) {
      console.log(error)
      const message = setError(error);
      toast.error(message);
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginSlice = createSlice({
  name: "auth-login",
  initialState,
  reducers: {
    userLogout: (state: UserSliceState) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(state, action)
      state.loading = false;
      // state.userInfo = action.payload;
      state.userInfo = {
        id: "1",
        email: "morrison@gmail.com",
        isAdmin: false,
        name: "Federico",
        createdAt:new Date( "2021-07-14T10:22:35.000Z")
      }
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { userLogout } = loginSlice.actions;

export default loginSlice;
