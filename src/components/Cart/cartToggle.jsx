import React, { useState, memo } from 'react';
import { Cart } from './cart';
import profilePic from '../images/profile.png'


export const CartToggle = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  
  

  return (
    <div>
      <button onClick={toggleCartVisibility}>
        <img className='w-10 ms-3' src={profilePic}></img>
      </button>
      {isCartVisible && (
        <div className="modal z-10">
          <div className="modal-content mt-10">
            <button className='more-button mb-3' onClick={toggleCartVisibility}>X</button>
            <Cart />
          </div>
        </div>

      )}
    </div>
  );
}