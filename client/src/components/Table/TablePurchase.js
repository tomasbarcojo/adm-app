import React, { useState } from "react";
import { Link } from "react-router-dom"
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

import DeleteDialog from './DeleteDialog'

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, options, stock } = props;



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
            let total = 0;
            // const [cant, setCant] = useState(0);
            let cantidad = 0

            const handleChangeCounter = () => {
              cantidad = cantidad + 1
              console.log(cantidad)
            }

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
                    <Counter stock={prop.stock} />
                  </TableCell>
                  <TableCell className={classes.tableCell} key={key}>
                    <input />
                  </TableCell>

                  <TableCell className={classes.tableCell} key={key}>
                    $ {total}
                  </TableCell>


                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <div>
        <p>hola</p>
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