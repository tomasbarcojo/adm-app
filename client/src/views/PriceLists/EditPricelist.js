import React from "react";
import { useParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../styles/components/tableStyle.js";

import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

import { getPriceListsById, clearData } from "../../actions/pricelists";

import Token from '../../Token/Token'

const useStyles = makeStyles(styles);

export default function CustomTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  var token = Token();
  const { id } = useParams()
  const pricelists = useSelector(state => state.pricelistsbyid)

  useEffect(() => {
    dispatch(getPriceListsById(token, id))
  }, [])

  useEffect(() => { //to clear if there are data on pricelistsbyid and show correct information
    if (pricelists && pricelists.length > 0) {
      dispatch(clearData())
    }
  }, [])


  return (
    <div className={classes.tableResponsive}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Listados</h4>
          <p className={classes.cardCategoryWhite}>
            Listado de precios
          </p>
        </CardHeader>
        <CardBody>
          <Table className={classes.table}>
            <TableHead className={classes["primary" + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ID</TableCell>
                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Articulo</TableCell>
                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Porcentaje</TableCell>
                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Fecha creacion</TableCell>
                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Ultima modificacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricelists && pricelists.length > 0 ?
                pricelists.map((pricelist, key) => {
                  return (
                    <TableRow key={key} className={classes.tableBodyRow} hover={true}>
                      <TableCell className={classes.tableCell} key={key}>
                        {pricelist.articleId && pricelist.articleId}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={key}>
                        {pricelist.article.articleName && pricelist.article.articleName}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={key}>
                        <input id={pricelist.article.articleId} type="number" className={classes.articleInput} defaultValue={pricelist.percentage} /> %
                      </TableCell>
                      <TableCell className={classes.tableCell} key={key}>
                        {pricelist.createdAt.slice('T', 10)} / {pricelist.createdAt.split('T')[1].slice(0, 5)}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={key}>
                        {pricelist.updatedAt.slice('T', 10)} / {pricelist.updatedAt.split('T')[1].slice(0, 5)}
                      </TableCell>
                    </TableRow>
                  )
                })
                :
                <h5>{"algo salio mal :("}</h5>
              }
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
