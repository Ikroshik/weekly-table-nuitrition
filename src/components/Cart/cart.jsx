import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../../state/cart/cartSlice';
import { Info } from '../Cards/info';
import recycleBin from '../images/recycle_bin.png'


export const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodForInfo, setFoodForInfo] = useState({})


  useEffect(() => {
    // Подсчет общего количества калорий при изменении корзины
    const calculatedTotal = cartItems.reduce((sum, item) => {
      return sum + Number(item.selectedMetric.calories);
    }, 0);

    setTotalCalories(calculatedTotal);
  }, [cartItems]);

  const handleRemoveItem = (event, id) => {
    event.stopPropagation();
    dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOpenInfo = useCallback((food, metricInCart) => {
    setFoodForInfo({food, metricInCart})
  }, []);

  const handleClose = useCallback(() => {
    setFoodForInfo({})
  }, []);

  return (
    <div>
      <ul>
        {cartItems.map(item => (
          <li onClick={() => handleOpenInfo(item.food, item.selectedMetric.metric)} className='selectedFood hover:bg-gray-300 duration-300 ease-in-out' key={item.food.id}>
            <button>{item.food.name}</button> - <b>{item.selectedMetric.metric}g</b>/<b>{item.selectedMetric.calories} calories</b>
            <button onClick={(event) => handleRemoveItem(event, item.food.id)}><img className='w-5 ms-5' src={recycleBin} /></button>
          </li>
        ))}
      </ul>
      <p>Total calories: <b>{totalCalories}</b></p>
      <button onClick={handleClearCart}>
        Clear Cart
      </button>
      {foodForInfo && <Info food={foodForInfo.food} metricInCart={foodForInfo.metricInCart} onClose={handleClose}/>}
    </div>
  );
};