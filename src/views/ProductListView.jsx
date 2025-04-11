
import { getProducts } from '../api/productsApi';
import { useEffect, useState } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import ProductListItem from '../components/ProductListItem';

export default function ProductListView() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);  // Productos filtrados
  const [searchQuery, setSearchQuery] = useState('');


  const fetchProducts = async () => {
    try {
      if(!localStorage.getItem('cache_data') || new Date() > new Date(localStorage.getItem('expiration_cache_data_time'))){
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        const expirationTime = new Date(new Date().setHours(new Date().getHours() + 1));
        localStorage.setItem('cache_data',JSON.stringify(data));
        localStorage.setItem('expiration_cache_data_time',expirationTime.toString());        
      }else{
        setProducts(JSON.parse(localStorage.getItem('cache_data')));
        setFilteredProducts(JSON.parse(localStorage.getItem('cache_data')));
      }
      

    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); 

    if (query === '') {
      setFilteredProducts(products); 
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.model.toLowerCase().includes(query.toLowerCase())
        )
      );
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
          value={searchQuery} 
          onChange={handleSearchChange}
        />
      </div>
            <div className="container mt-4">
              <div className='row'>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((filteredProduct) => (
                    <div key={`${filteredProduct.id}`} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" >
                      <ProductListItem  itemProduct={filteredProduct} />
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
