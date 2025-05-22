import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setError } from "../../utils/error";
import publicAxios from "../../utils/public-axios";
import { store } from "../index";
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
  token?: string;
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
      const res = await publicAxios.post("/authentication", { username: user.email, password: user.password });
      if (res.data) {

        const name = res.data?.data?.userInfo?.name;

        if (name) {
          toast.success(`Bienvenido 👏 ${name}`);
        }
        return res.data;
      }
    } catch (error: any) {
      const message = setError(error);
      toast.error(message);
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "users/logout", async () => {
    try {

      const res = await publicAxios.post("/authentication/logout", {},
        {
          headers: {
            Authorization: `Bearer ${store.getState().login.token}`,
          }
        }
      );
      if (res.data) {
        return res.data;
      }
    } catch (error: any) {
      const message = setError(error);
      toast.error(message);
    }
  }
);

export const loginSlice = createSlice({
  name: "auth-login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload?.data.userInfo;
      state.token = action.payload?.data.token;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.userInfo = null;
      state.token = undefined;
      toast.success("Logout successful");
    });
    builder.addCase(userLogout.rejected, (state) => {
      state.loading = false;
    });
  },
});


export default loginSlice;
