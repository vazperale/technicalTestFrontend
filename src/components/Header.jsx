import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import Breadcrumbs from './Breadcrumbs';

const header = () => {
  return (
    <header>
      <div className='d-flex justify-content-between'>
      <span className='logo'>
        <Link to="/">Mobile Shop</Link>
      </span>
      
        <span className='logo-carrito d-flex align-items-center'>
           <FaShoppingCart /> 
           <span className='ms-2'>3</span>
        </span>
      </div>
      <div >
      <Breadcrumbs />
      </div>
    </header>
  );
};

export default header