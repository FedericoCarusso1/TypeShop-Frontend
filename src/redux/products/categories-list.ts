import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import publicAxios from '../../utils/public-axios';

export interface Category {
    id: string;
    name: string;
}

interface CategorySliceState {
    categories: Category[];
    loading: boolean;
    error: null | object;
}

const initialState: CategorySliceState = {
    categories: [],
    loading: false,
    error: null,
};

export const getCategories = createAsyncThunk(
    'categories/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await publicAxios.get('/categories');
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
            state.loading = false;
            const { data } = action.payload
            state.categories = data as Category[] || [];
        });
        builder.addCase(getCategories.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default categorySlice;
