import { useEffect, useState } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const size = 10;

  useEffect(() => {
    setLoading(true); // Reset loading state when page changes
    fetch(`https://chronoclick.onrender.com/products?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [page]);

  return [products, page, setPage, loading, pageCount, setProducts];
};

export default useProducts;
