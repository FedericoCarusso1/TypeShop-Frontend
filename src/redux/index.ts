// 

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import cartSlice from './cart/cart-slice';
import { productListSlice } from './products/slice-list';
import orderListSlice from './orders/slice-list';
import productDetailsSlice from './products/slice-details';
import loginSlice from './users/login-slice';
import userDetailsSlice from './users/user-details';
import userListSlice from './users/user-list';
import userOrderSlice from './orders/user-orders';
import orderDetailSlice from './orders/order-details';
import productFilterSlice from './products/search-list';
import { authorizationProvider } from '../utils/auth-axios';
import categorySlice from './products/categories-list';

const rootReducer = combineReducers({
  productList: productListSlice.reducer,
  cart: cartSlice.reducer,
  productDetail: productDetailsSlice.reducer,
  productFilter: productFilterSlice.reducer,
  categories: categorySlice.reducer,

  // Auth
  login: loginSlice.reducer,
  userDetails: userDetailsSlice.reducer,
  userList: userListSlice.reducer,

  // Orders
  orders: orderListSlice.reducer,
  userOrder: userOrderSlice.reducer,
  orderDetail: orderDetailSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Configuración de headers autorizados
authorizationProvider(store);
