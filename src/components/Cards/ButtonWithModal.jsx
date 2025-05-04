import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Info } from './info';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay fixed" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export const ButtonWithModal = ({ food }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardOpen = () => {
    setIsSelected((prevSelected) => !prevSelected);
  };

  return (
    <>
      <button className="more-button mt-3" onClick={handleCardOpen}>
        Read more
      </button>
      {isSelected && (
        <Modal onClose={handleCardOpen}>
          <Info food={food} onClose={handleCardOpen} />
        </Modal>
      )}
    </>
  );
};