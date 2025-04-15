import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import Breadcrumbs from './Breadcrumbs';
import useCart from '../context/useCart';
import strings from '../config/strings';


export default function Header (){

  const { cartCount } = useCart();

  return (
    <header>
      <div className='d-flex justify-content-between'>
      <span className='logo'>
        <Link to="/">{strings["header.logo.name"]}</Link>
      </span>
      
        <span className='logo-carrito d-flex align-items-center'>
           <FaShoppingCart /> 
           <span className='ms-2'>{cartCount}</span>
        </span>
      </div>
      <div >
      <Breadcrumbs />
      </div>
    </header>
  );
};
