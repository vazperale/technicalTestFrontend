import { getProducts } from '../api/productsApi';
import { useEffect, useState } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import ProductListItem from '../components/ProductListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ProductListView() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [visibleProducts, setVisibleProducts] = useState([]); // Productos visibles actualmente
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true); // Control para cargar más productos

  const ITEMS_PER_PAGE = 20; // Número de productos cargados por página

  const fetchProducts = async () => {
    try {
      if (
        !localStorage.getItem('cache_data') ||
        new Date() > new Date(localStorage.getItem('expiration_cache_PLP_data_time'))
      ) {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setVisibleProducts(data.slice(0, ITEMS_PER_PAGE)); // Mostrar los primeros elementos

        const expirationTime = new Date(new Date().setHours(new Date().getHours() + 1));
        localStorage.setItem('cache_data_PLP', JSON.stringify(data));
        localStorage.setItem('expiration_cache_PLP_data_time', expirationTime.toString());
      } else {
        const cachedData = JSON.parse(localStorage.getItem('cache_data_PLP'));
        setProducts(cachedData);
        setFilteredProducts(cachedData);
        setVisibleProducts(cachedData.slice(0, ITEMS_PER_PAGE)); // Mostrar los primeros elementos
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
      setVisibleProducts(products.slice(0, ITEMS_PER_PAGE));
      setHasMore(true);
    } else {
      const filtered = products.filter(
        (product) =>
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.model.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setVisibleProducts(filtered.slice(0, ITEMS_PER_PAGE));
      setHasMore(filtered.length > ITEMS_PER_PAGE);
    }
  };

  const fetchMoreProducts = () => {
    if (visibleProducts.length >= filteredProducts.length) {
      setHasMore(false);
      return;
    }

    const nextProducts = filteredProducts.slice(
      visibleProducts.length,
      visibleProducts.length + ITEMS_PER_PAGE
    );
    setVisibleProducts((prev) => [...prev, ...nextProducts]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <CommonLayout>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className="d-flex justify-content-end mt-2">
            <input
              type="text"
              data-testid="search-bar"
              className="search-input"
              placeholder="Search for a product..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="container mt-4">
            <InfiniteScroll
              dataLength={visibleProducts.length}
              next={fetchMoreProducts}
              hasMore={hasMore}
              loader={<p>Loading more products...</p>}
              style={{ overflow: 'visible' }}
            >
              <div className="row">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <ProductListItem itemProduct={product} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </>
      )}
    </CommonLayout>
  );
}
