import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 10;
  useEffect(() => {
    fetch(`http://localhost:5000/products?${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  return [products, page, setPage, pageCount, setProducts];
};

export default useProducts;
