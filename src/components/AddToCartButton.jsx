import React from 'react';

export default function AddToCartButton ({ disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className="btn btn-dark"
    >
      Add to Cart
    </button>
  );
};

