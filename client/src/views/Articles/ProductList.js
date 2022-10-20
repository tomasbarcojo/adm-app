import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as generateGuid } from 'uuid';
import { getArticles } from '../../actions/article';
import Token from '../../Token/Token';
const { REACT_APP_URL_API } = process.env;

export default function ProductList() {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const token = Token();

  const isEmptyProducts = !listProducts || listProducts.length === 0;

  const fetchProducts = async () => {
    setLoading(true);
    console.log('4');
    const newPage = page + 1;

    const res = await fetch(`${REACT_APP_URL_API}/article?skip=${page}&limit=50`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result && result.data) {
      console.log('1');
      const newProducts = [...listProducts, ...result.data.data];

      if (newProducts.length >= totalCount) {
        console.log('2');

        setHasMore(false);
      }
      console.log('3');

      setListProducts(newProducts);
      console.log('Products: ', listProducts);

      setPage(newPage);
    }
    console.log('6');

    setLoading(false);
  };

  useEffect(() => {
    console.log('5');
    fetchProducts();
  }, []);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchProducts}
      hasMore={hasMore}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
      threshold={350}
      initialLoad={true}
      style={{ width: '100%' }}
    >
      {!isEmptyProducts &&
        listProducts.map((el, id) => {
          return (
            <>
              <p>{el.articleName}</p>
            </>
          );
        })}
    </InfiniteScroll>
  );
}

// const dispatch = useDispatch();
// const [hasMore, setHasMore] = useState(false);
// const [isLoading, setIsLoading] = useState(true);
// const [keyScroller, setKeyScroller] = useState(generateGuid());
// const [keyInitList, setKeyInitList] = useState(generateGuid());
// const listProducts = useSelector((state) => state.articles);
// const token = Token();

// const handleGetMore = async (page) => {
//   console.log('ENTROOO')
//   try {
//     dispatch(getArticles(token, page));
//     setHasMore(page < listProducts.length);
//   } catch (err) {
//     alert(err);
//   }
//   setIsLoading(false);
// };

// useEffect(() => {
//   dispatch(getArticles(token, 1, 15));
//   setKeyScroller(generateGuid());
// }, keyInitList);

// let count = 0;

// return (
//   // <List className="List" height={1500} itemCount={1000} itemSize={35} width={1000}>
//   //   {Row}
//   // </List>
//   <div>
//     <InfiniteScroll
//       key={keyScroller}
//       pageStart={1}
//       hasMore={hasMore}
//       initialLoad={true}
//       loadMore={handleGetMore}
//       element="div"
//       loader={
//         <div className="loader" key={0}>
//           Loading ...
//         </div>
//       }
//     >
//       {listProducts.map((el) => {
//         count++;
//         return (
//           <>
//             <p>{count}</p>
//             <p>{el.articleName}</p>
//           </>
//         );
//       })}
//     </InfiniteScroll>
//   </div>
// );
