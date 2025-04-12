import React from 'react';

export default function AlertNotification  ({ showAlert }) {
  return (
    showAlert && (
      <div className="alert alert-success mt-4" role="alert">
        Product added to the cart
      </div>
    )
  );
};
