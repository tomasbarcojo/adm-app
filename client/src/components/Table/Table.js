import React from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from '@material-ui/icons/Edit';
import DeleteDialog from '../ConfirmationDialog/DeleteDialog';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import styles from "../../styles/components/tableStyle.js";
import styles2 from "../../styles/components/tasksStyle.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

export default function CustomTable(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { tableHead, tableData, tableHeaderColor } = props;
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
                align="right"
                className={classes.tableCell + " " + classes.tableHeadCell}
              >
                Opciones
                  </TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <>
                <TableRow key={key} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right" className={classes.tableCell} key={key}>
                    <Tooltip
                      id="tooltip-top"
                      title="Editar"
                      placement="top"
                      classes={{ tooltip: classes2.tooltip }}
                    >
                      <Link to={`${prop[0]}`}>
                      <IconButton
                        aria-label="Edit"
                        className={classes2.tableActionButton}
                      >
                        <Edit
                          className={
                            classes2.tableActionButtonIcon + " " + classes2.edit
                          }
                        />
                      </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Eliminar"
                      placement="top"
                      classes={{ tooltip: classes2.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes2.tableActionButton}
                      >
                        <Close
                          className={
                            classes2.tableActionButtonIcon + " " + classes2.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
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
