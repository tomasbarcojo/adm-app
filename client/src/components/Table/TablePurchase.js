import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/components/tableStyle.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import Counter from './Counter'
import TableHtml from "./TableHtml.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, options, stock } = props;
  let data = {};

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}

              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}
              >
                Cantidad
              </TableCell>

              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}
              >
                Precio de compra
              </TableCell>

              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}
              >
                Monto
              </TableCell>

            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <>
                <TableRow key={key} className={classes.tableBodyRow} hover={true}>
                  {prop.data && prop.data.length > 0 ?
                    <>
                      {prop.data.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </>
                    : <>
                      {prop.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </>
                  }
                  <TableCell className={classes.tableCell}>
                    <Counter id={prop.id}/>
                  </TableCell>
                  <TableCell className={classes.tableCell} key={key}>
                    <input id={prop.id}/>
                  </TableCell>

                  <TableCell className={classes.tableCell} key={key}>
                    $ 10
                  </TableCell>


                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <div>
        <p>hola</p>
        <TableHtml />
      </div>
    </div>
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