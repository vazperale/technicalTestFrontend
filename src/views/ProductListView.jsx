
import { getProducts } from '../api/productsApi';
import { useEffect, useState } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import ProductListItem from '../components/ProductListItem';

export default function ProductListView() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async (search) => {
    try {
      const data = await getProducts();
      setProducts(data);

    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <CommonLayout>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
          <div className="d-flex justify-content-end mt-2">
        <input
          type="text"
          data-testid='search-bar'
          className="search-input"
          placeholder="Search for a product..."
        />
      </div>
            <div className="container mt-4">
              <div className='row'>
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={`${product.id}`} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" >
                      <ProductListItem  itemProduct={product} />
                    </div>
                  ))
                ) : (
                  <p>No results.</p>
                )}
              </div>
            </div>
          </>
        )}
      </CommonLayout>
    </>
  );
}
