import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styles from "../../styles/components/tableStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function Test({ prop, key }) {
  const classes = useStyles();

  return (
    <div>
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
          asd
        </TableCell>
        <TableCell className={classes.tableCell} key={key}>
          <input />
        </TableCell>

        <TableCell className={classes.tableCell} key={key}>
          $ 
        </TableCell>


      </TableRow>
    </div>
  )
}
