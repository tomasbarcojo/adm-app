import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as generateGuid } from 'uuid';
import { getArticles } from '../../actions/article';
import Token from '../../Token/Token';
const { REACT_APP_URL_API } = process.env;

export default function ProductList() {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(200);
  const [page, setPage] = useState(1);
  const token = Token();

  const isEmptyProducts = !listProducts || listProducts.length === 0;

  const fetchProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('2');
    const newPage = page + 1;

    const res = await fetch(`${REACT_APP_URL_API}/product?page=${page}&limit=50`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    setTotalCount(result.total);

    if (result && result.data) {
      console.log('3');
      const newProducts = [...listProducts, ...result.data];
      console.log(newProducts.length, totalCount);
      if (newProducts.length >= totalCount) {
        console.log('4');
        setHasMore(false);
      }
      setListProducts(newProducts);

      setPage(newPage);
    }
    console.log('6');

    setIsLoading(false);
  };
console.log('bokita', isLoading, hasMore)


  return (
    <>
      <InfiniteScroll
        loadMore={fetchProducts}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        pageStart={0}
        useWindow
        style={{background: 'red', height: 'auto'}}

        threshold={5}
      >
        {listProducts.map((item, index) => {
          return <div>This is a div element #{index + 1} inside InfiniteScroll</div>;
        })}
      </InfiniteScroll>
    </>
  );
}
