import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className='breadcrumbs'>
      <ol className='m-1'>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to}>
              <span>/</span>
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;