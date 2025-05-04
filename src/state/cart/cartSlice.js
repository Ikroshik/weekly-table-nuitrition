import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const existingItem = state.items.find(item => item.food.id === action.payload.food.id);

        if (!existingItem) {
          state.items.push(action.payload);
        }
        else if (existingItem.selectedMetric.calories !== action.payload.selectedMetric.calories) {
          state.items = state.items.filter(item => item.food.id !== action.payload.food.id);
          state.items.push(action.payload);
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.food.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;