'use client';

import { useCallback, useEffect, useState } from 'react';

const API_URL = 'https://dummyjson.com/products?limit=15';

const Products: React.FC = () => {
  const [data, setData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data?.products || []);
      setError(null);
    } catch {
      setError('something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Something went wrong. Refresh the page.</h3>;
  }
  return data.map(product => <p key={product.id}>{product.title}</p>);
};

export default Products;
