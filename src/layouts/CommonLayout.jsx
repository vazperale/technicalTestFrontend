import React from 'react';
import Header from '../components/Header';

const CommonLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;