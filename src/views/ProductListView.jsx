
import { getProducts } from '../api/productsApi';
import { useEffect, useState } from 'react';


export default function ProductListView() {
 
  const [products, setProducts] = useState([]);


  const fetchProducts = async (search) => {
    try {
        const data = await getProducts();
        setProducts(data);
       
    } catch (error) {
      console.log('Error fetching products:', error);
    } 
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  return (
    <>
    <h1>Lista</h1>
    <div className="d-flex flex-wrap justify-content-center align-items-start">
      <ul>
            {products.length > 0 ? (
              products.map((product) => (

                <li key={`${product.id}`} >${product.id}</li>
              ))
            ) : (
              <p>No results.</p>
            )}
            </ul>
          </div>
    </>
  );
}
