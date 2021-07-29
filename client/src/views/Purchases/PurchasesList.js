import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
// core components
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import styles from "../../styles/components/tableStyle.js";
import OrderStateDialog from "../../components/OrderStateDialog/OrderStateDialog"
import { getPurchases } from "../../actions/purchases.js";
import Token from '../../Token/Token'
import OrderDetailPurchase from '../../components/OrderDetailPurchase/OrderDetailPurchase'

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  var token = Token();
  const dispatch = useDispatch();
  const { tableHead, tableData, tableHeaderColor, options } = props;
  const createdPurchases = useSelector(state => state.createdPurchases)

  useEffect(() => {
    dispatch(getPurchases(token))
  }, [])

  const handleChangeSearchInput = (e) => {
    const name = { name: e.target.value }
    if (name.name.length > 0) {
      // dispatch(getSuppliersByName(token, name))
    } else {
      // dispatch(getSuppliers(token))
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.card}>
              <div>
                <h4 className={classes.cardTitleWhite}>Compras</h4>
                <p className={classes.cardCategoryWhite}>
                  Listado de compras
                </p>
              </div>
              <input className='searchInput' type="search" placeholder="Buscar..." onChange={handleChangeSearchInput} />
            </div>
          </CardHeader>
          <CardBody>
            {createdPurchases && createdPurchases.length !== 0 ?
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                    <TableRow className={classes.tableHeadRow}>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        ID
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Proveedor
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Estado
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Fecha
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Hora
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Detalle
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {createdPurchases.map((prop, key) => {
                      return (
                        <TableRow key={key} className={classes.tableBodyRow} hover={true}>
                          <TableCell className={classes.tableCell} key={key}>
                            {prop.id}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={key}>
                            {prop.supplier.businessName}
                          </TableCell>
                          <TableCell>
                            <OrderStateDialog state={prop.state} purchaseId={prop.id} /*to={row.user.email} name={row.user.firstName}*/ />
                          </TableCell>
                          <TableCell className={classes.tableCell} key={key}>
                            {prop.createdAt.slice('T', 10)}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={key}>
                            {prop.createdAt.split('T')[1].slice(0, 5)}
                          </TableCell>
                          <TableCell className={classes.tableCell} key={key}>
                            <OrderDetailPurchase purchaseId={prop.id} />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table >
              </div>
              : <h5 className='messageEmptyDataTable'>No existen compras</h5>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};