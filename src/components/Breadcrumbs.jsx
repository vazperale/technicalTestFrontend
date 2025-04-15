import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProduct } from '../api/productsApi';
import strings from '../config/strings';

const Breadcrumbs = () => {
  const location = useLocation();
  const { id } = useParams(); 
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [productModel, setProductModel] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const product = await getProduct(id);
          if (product) {
            setProductModel(product.model); 
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
      setIsReady(true); 
    };
    fetchProduct();
  }, [id]);

  if (!isReady) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className='breadcrumbs'>
      <ol className='m-1'>
        <li>
          <Link to="/">{strings["header.breadcrum.inicio"]}</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to}>
              <span className='me-2'>/</span>
              {isLast && productModel ? (
                <span>{productModel}</span>
              ) : (
                <Link to={to}>{value}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
