import { getProducts } from '../api/productsApi';
import React, { useEffect, useState, useCallback } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import ProductListItem from '../components/ProductListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/searchBar';
import strings from '../config/strings';

export default function ProductListView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]); // Productos visibles actualmente(Infinite Scroll)
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true); // Control para cargar más productos(Infinite Scroll)

  const ITEMS_PER_PAGE = 20; // Número de productos cargados por página(Infinite Scroll)

  const updateStatesAndVisibleProducts = useCallback((data) => {
    setProducts(data);
    setFilteredProducts(data);
    setVisibleProducts(data.slice(0, ITEMS_PER_PAGE)); // Mostrar los primeros elementos(Infinite Scroll)
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      if (!localStorage.getItem('cache_PLP') || new Date() > new Date(localStorage.getItem('expiration_cache_PLP'))) {
        const data = await getProducts();
        updateStatesAndVisibleProducts(data);

        const expirationTime = new Date(new Date().setHours(new Date().getHours() + 1));
        localStorage.setItem('cache_PLP', JSON.stringify(data));
        localStorage.setItem('expiration_cache_PLP', expirationTime.toString());
      } else {
        const cachedData = JSON.parse(localStorage.getItem('cache_PLP'));
        updateStatesAndVisibleProducts(cachedData);
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [updateStatesAndVisibleProducts]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredProducts(products);
      setVisibleProducts(products.slice(0, ITEMS_PER_PAGE));
      setHasMore(true);
    } else {
      const filtered = products.filter((product) => {
        const queryWords = query.toLowerCase().trim().split(/\s+/);
        return queryWords.every((word) =>
          `${product.brand} ${product.model}`.toLowerCase().includes(word)
        );
      });
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
  }, [fetchProducts]);

  return (
    <CommonLayout>
      {loading ? (
        <p>{strings["plp.products.loading"]}</p>
      ) : (
        <>
          <div className="d-flex justify-content-end mt-2">
            <SearchBar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              placeholder="Search for a product..."
            />
          </div>
          <div className="container mt-4">
            <InfiniteScroll
              dataLength={visibleProducts.length} 
              next={fetchMoreProducts} 
              hasMore={hasMore} 
              loader={<p>{strings["plp.products.infinitescroll.loadmore"]}</p>} 
              style={{ overflow: 'visible' }}
            >
              <div className="row">
                {visibleProducts.length === 0 ? (
                  <div className="col-12 text-center">
                    <p>{strings["plp.products.noresults"]}</p>
                  </div>
                ) : (
                  visibleProducts.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                      <ProductListItem itemProduct={product} />
                    </div>
                  ))
                )}
              </div>
            </InfiniteScroll>
          </div>
        </>
      )}
    </CommonLayout>
  );
}
