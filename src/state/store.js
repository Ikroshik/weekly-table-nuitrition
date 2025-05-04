import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import { foodsApiSlice } from './foods/foodsApiSlice';
import foodInfoReducer from './foods/foodsSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    pageAndFood: foodInfoReducer,
    [foodsApiSlice.reducerPath]: foodsApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(foodsApiSlice.middleware)
  }
});