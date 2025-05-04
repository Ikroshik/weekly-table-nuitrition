import React, { useState, useCallback } from 'react';
import nonImage from '../images/noImage.png';
import { ButtonWithModal } from './ButtonWithModal';



export const Card = ({ food }) => {


  return (
    <>
      <div className='card_product'>
        <div className='card-product'>
          <h3>{food.name}</h3>
          <p>Type: {food.type}</p>
          <ButtonWithModal food={food}/>
        </div>
        <img
          src={food.images.length > 0 ? food.images[0] : nonImage}
          alt={food.name}
          className="w-20" />
      </div>
    </>
  );
};
