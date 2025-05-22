import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/product-card';
import { AddressTypes } from '../../utils/interfaces';

// Estado del carrito con array de direcciones
export interface CartSliceState {
  cartItems: Product[];
  shippingAddress: AddressTypes[];
}

const initialState: CartSliceState = {
  cartItems: [],
  shippingAddress: [],
};

export const cartSlice = createSlice({
  name: 'cart-items',
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exist = state.cartItems.find(item => item.id === product.id);

      if (exist) {
        state.cartItems = state.cartItems.map(item =>
          item.id === product.id ? { ...product, qty: (item.qty || 1) + 1 } : item
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
          item.id === product.id ? { ...product, qty: (item.qty || 1) - 1 } : item
        );
      }
    },

    saveAddress: (state, action: PayloadAction<AddressTypes>) => {
      let newAddress = action.payload;

      // Si no viene con id, generamos uno trucho pero único
      if (!newAddress.id) {
        newAddress = {
          ...newAddress,
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        };
      }

      const index = state.shippingAddress.findIndex(addr => addr.id === newAddress.id);

      if (index !== -1) {
        state.shippingAddress = [
          ...state.shippingAddress.slice(0, index),
          newAddress,
          ...state.shippingAddress.slice(index + 1),
        ];
      } else {
        state.shippingAddress = [...state.shippingAddress, newAddress];
      }
    },

    editAddress: (
      state,
      action: PayloadAction<{ id: string; newAddress: AddressTypes }>
    ) => {
      const { id, newAddress } = action.payload;
      const index = state.shippingAddress.findIndex(addr => addr.id === id);

      if (index !== -1) {
        state.shippingAddress = [
          ...state.shippingAddress.slice(0, index),
          newAddress,
          ...state.shippingAddress.slice(index + 1),
        ];
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
});

export const {
  addToCart,
  removeFromCart,
  saveAddress,
  editAddress,
  removeAddress,
  reset,
} = cartSlice.actions;

export default cartSlice;
