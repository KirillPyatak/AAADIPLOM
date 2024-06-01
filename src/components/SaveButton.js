// SaveButton.js
import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Импортируем иконки звезды

function SaveButton({ isSaved, onSave, onUnsave }) {
  return (
    <button onClick={isSaved ? onUnsave : onSave}>
      {isSaved ? <FaStar color="gold" /> : <FaRegStar />} {/* Используем иконки звезды */}
    </button>
  );
}

export default SaveButton;
