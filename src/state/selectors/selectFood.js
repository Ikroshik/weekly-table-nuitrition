import { createSelector } from 'reselect';

const selectPageAndFood = state => {
  console.log('selectPageAndFood called');
  return state.pageAndFood;
};

export const selectSelectedFoodId = createSelector(
    [selectPageAndFood],
    pageAndFood => {
      console.log('selectSelectedFoodId called with:', pageAndFood);
      return pageAndFood.food;
    }
);