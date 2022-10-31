import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Token from '../../Token/Token';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import styles from '../../styles/components/tableStyle';
import styles2 from '../../styles/components/tasksStyle.js';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core';
import { useQueryParams } from '../../utils/useQueryParams';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

const { REACT_APP_URL_API } = process.env;

export default function ProductList() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(100);
  const [page, setPage] = useState(1);
  const token = Token();
  const filters = useQueryParams();
  const castedFilters = {
    search: filters.params.search || '',
  };

  const fetchProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const newPage = page + 1;
    const res = await fetch(`${REACT_APP_URL_API}/product?page=${newPage}&search=${castedFilters.search}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    setTotalCount(result.total);
    if (result && result.data) {
      const newProducts = [...listProducts, ...result.data];
      if (newProducts.length >= totalCount) {
        setHasMore(false);
      }
      setListProducts(newProducts);
      setPage(newPage);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (isLoading) return;
      setIsLoading(true);
      const res = await fetch(`${REACT_APP_URL_API}/product?page=1&search=${castedFilters.search}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setTotalCount(result.total);
      if (result && result.data) {
        setListProducts(result.data);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [JSON.stringify(castedFilters)]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.card}>
                <div>
                  <h4 className={classes.cardTitleWhite}>Productos</h4>
                  <p className={classes.cardCategoryWhite}>Listado de productos</p>
                </div>
                <input
                  className="searchInput"
                  type="search"
                  placeholder="Buscar..."
                  defaultValue={filters.params.search}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      filters.setParam('search', e.target.value);
                    }
                  }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes.primaryTableHeader}>
                    <TableRow className={classes.tableHeadRow}>
                      <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell}>ID</TableCell>
                      <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell}>Razon Social</TableCell>
                      <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell}>CUIT</TableCell>
                      <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell}>Test1</TableCell>
                      <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell}>Test2</TableCell>
                      <TableCell align="right" className={classes.tableCell + ' ' + classes.tableHeadCell}>
                        Opciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <InfiniteScroll
                    initialLoad={false}
                    loadMore={fetchProducts}
                    hasMore={hasMore}
                    element="tbody"
                    pageStart={2}
                    loader={
                      <tr key={0}>
                        <td>
                          <div style={{ display: 'flex' }}>Loading...</div>
                        </td>
                      </tr>
                    }
                  >
                    {listProducts.map((item, key) => {
                      return (
                        <TableRow key={key} className={classes.tableBodyRow} hover={true}>
                          <TableCell className={classes.tableCell} key={item.id}>
                            {item.id}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={item.name}>
                            {item.name}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={item.code}>
                            {item.code}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={item.price}>
                            {item.price}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={item.stock}>
                            {item.stock}
                          </TableCell>
                          <TableCell align="right" className={classes.tableCell} key={key}>
                            <Tooltip
                              id="tooltip-top-start"
                              title={`Editar`}
                              placement="top"
                              classes={{ tooltip: classes2.tooltip }}
                            >
                              <Link to={`${item.id}`}>
                                <IconButton
                                  aria-label={`Editar + ${item.id}`}
                                  className={classes2.tableActionButton}
                                  // onClick={() => console.log(prop.editpathname)}
                                >
                                  <Edit className={classes2.tableActionButtonIcon + ' ' + classes2.edit} />
                                </IconButton>
                              </Link>
                            </Tooltip>
                            {/* <DeleteDialog path={'/products'} id={item.id} /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </InfiniteScroll>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
