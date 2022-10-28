import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Edit from '@material-ui/icons/Edit';
// core components
import styles from '../../styles/components/tableStyle.js';
import styles2 from '../../styles/components/tasksStyle.js';

import DeleteDialog from './DeleteDialog';
import InfiniteScroll from 'react-infinite-scroller';
import Token from '../../Token/Token.js';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

const { REACT_APP_URL_API } = process.env;

export default function CustomTable2(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { tableHead, tableData, tableHeaderColor, options } = props;
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(200);
  const [page, setPage] = useState(1);
  const token = Token();

  const isEmptyProducts = !listProducts || listProducts.length === 0;

  const fetchProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const newPage = page + 1;

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
      if (newProducts.length >= totalCount) {
        setHasMore(false);
      }
      setListProducts(newProducts);

      setPage(newPage);
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
              {options ? (
                <TableCell align="right" className={classes.tableCell + ' ' + classes.tableHeadCell}>
                  Opciones
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
        ) : null}
        <InfiniteScroll
          loadMore={fetchProducts}
          hasMore={hasMore}
          element="tbody"
          loader={
            <tr key={0}>
              <td>
                <div style={{ display: 'flex' }}>Loading</div>
              </td>
            </tr>
          }
          pageStart={0}
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
                        size="medium"
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
  );
}

CustomTable2.defaultProps = {
  tableHeaderColor: 'gray',
};

CustomTable2.propTypes = {
  tableHeaderColor: PropTypes.oneOf(['warning', 'primary', 'danger', 'success', 'info', 'rose', 'gray']),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
