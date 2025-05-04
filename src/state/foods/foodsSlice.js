import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  totalPages: 0,
  currentFood: 'corn',
  food: null
};

const foodInfoSlice = createSlice({
  name: 'pageAndFood',
  initialState,
  reducers: {
    setCurrentPageRTK: (state, action) => {
        // console.log(action)
        console.log(action);
      state.currentPage = action.payload;
      // console.log(state.items)
    },
    setCurrentFood: (state, action) => {
      state.currentFood = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
      console.log(state.items);
    }
  },
});

export const { setCurrentPageRTK, setCurrentFood, setTotalPages } = foodInfoSlice.actions;
export default foodInfoSlice.reducer;