import React, { useState } from 'react';
import Token from '../../Token/Token';
import Table2 from '../../components/Table/Table2';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import styles from '../../styles/components/tableStyle'
import { makeStyles } from '@material-ui/core';
const { REACT_APP_URL_API } = process.env;

const useStyles = makeStyles(styles);

export default function ProductList() {
  const classes = useStyles();
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
    const newPage = page + 1;
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const res = await fetch(`${REACT_APP_URL_API}/product?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    setTotalCount(result.total);

    if (result && result.data) {
      const newProducts = [...listProducts, ...result.data];
      console.log(newProducts.length, totalCount);
      if (newProducts.length >= totalCount) {
        setHasMore(false);
      }
      setListProducts(newProducts);

      setPage(newPage);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.card}>
                <div>
                  <h4 className={classes.cardTitleWhite}>Proveedores</h4>
                  <p className={classes.cardCategoryWhite}>Listado de proveedores</p>
                </div>
                {/* <input
                  className="searchInput"
                  type="search"
                  placeholder="Buscar..."
                  onChange={handleChangeSearchInput}
                /> */}
              </div>
            </CardHeader>
            <CardBody>
              <Table2
                tableHeaderColor="primary"
                tableHead={['ID', 'Razon Social', 'CUIT', 'Test1', 'Test2']}
                options={true}
              ></Table2>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
