import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/product-card';
import { AddressTypes } from '../../utils/interfaces';
import { store } from '../index';
import publicAxios from '../../utils/public-axios';

// Estado inicial
export interface CartSliceState {
  cartItems: Product[];
  shippingAddress: AddressTypes[];
}

const initialState: CartSliceState = {
  cartItems: [],
  shippingAddress: [],
};

// Respuesta GET
interface FetchAddressesResponse {
  message: string;
  data: {
    shippingAddress: AddressTypes[]; // debe coincidir con la estructura real de la respuesta
  }
}

// Respuesta POST
interface SaveAddressResponse {
  message: string;
  data: AddressTypes;
}

// Thunk para obtener direcciones
export const getShippingAddress = createAsyncThunk<
  AddressTypes[] | null
>('cart/getShippingAddress', async () => {
  const token = store.getState()?.login?.token;
  if (!token) return null;

  try {
    const response = await publicAxios.get<FetchAddressesResponse>(
      '/user/shipping-address',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response.data.data.shippingAddress);

    return response.data?.data?.shippingAddress || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al obtener direcciones');
  }
});

// Thunk para guardar una dirección
export const saveAddress = createAsyncThunk<AddressTypes, AddressTypes>(
  'cart/saveAddress',
  async (address) => {
    const token = store.getState()?.login?.token;
    if (!token) throw new Error('No se encontró el token');

    try {
      const response = await publicAxios.post<SaveAddressResponse>(
        '/user/shipping-address',
        address,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al guardar dirección');
    }
  }
);

// Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exist = state.cartItems.find(item => item.id === product.id);

      if (exist) {
        state.cartItems = state.cartItems.map(item =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      } else {
        state.cartItems.push({ ...product, qty: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exist = state.cartItems.find(item => item.id === product.id);

      if (exist && exist.qty === 1) {
        state.cartItems = state.cartItems.filter(item => item.id !== product.id);
      } else {
        state.cartItems = state.cartItems.map(item =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) - 1 } : item
        );
      }
    },

    editAddress: (
      state,
      action: PayloadAction<{ id: string; newAddress: AddressTypes }>
    ) => {
      const { id, newAddress } = action.payload;
      const index = state.shippingAddress.findIndex(addr => addr.id === id);

      if (index !== -1) {
        state.shippingAddress[index] = newAddress;
      }
    },

    removeAddress: (state, action: PayloadAction<string>) => {
      state.shippingAddress = state.shippingAddress.filter(addr => addr.id !== action.payload);
    },

    reset: (state) => {
      state.cartItems = [];
      state.shippingAddress = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getShippingAddress.fulfilled, (state, action) => {
        if (action.payload) {
          state.shippingAddress = action.payload;
        }
      })
      .addCase(saveAddress.fulfilled, (state, action) => {
        const newAddress = action.payload;
        const index = state.shippingAddress.findIndex(addr => addr.id === newAddress.id);

        if (index !== -1) {
          state.shippingAddress[index] = newAddress;
        } else {
          state.shippingAddress.push(newAddress);
        }
      });
  },
});

// Exports
export const {
  addToCart,
  removeFromCart,
  editAddress,
  removeAddress,
  reset,
} = cartSlice.actions;

export default cartSlice;
