import React from 'react';

export default function AlertNotification  ({ showAlert,text }) {
  return (
    showAlert && (
      <div className="alert alert-success mt-4" role="alert">
        {text}
      </div>
    )
  );
};
