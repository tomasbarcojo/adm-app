import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// @mui/icons-material
import Edit from '@mui/icons-material/Edit';
// core components
import styles from '../../styles/components/tableStyle.js';
import styles2 from '../../styles/components/tasksStyle.js';

import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

export default function CustomTable(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { tableHead, tableData, tableHeaderColor, options } = props;

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
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <>
                <TableRow key={key} className={classes.tableBodyRow} hover={true}>
                  {prop.data && prop.data.length > 0 ? (
                    <>
                      {prop.data.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {prop.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </>
                  )}
                  {options ? (
                    <TableCell align="right" className={classes.tableCell} key={key}>
                      <Tooltip
                        id="tooltip-top-start"
                        title={`Editar`}
                        placement="top"
                        classes={{ tooltip: classes2.tooltip }}
                      >
                        <Link to={prop.editpathname ? prop.editpathname + `/${prop.id}` : `${prop.id}`}>
                          <IconButton
                            aria-label={`Editar + ${prop.id}`}
                            className={classes2.tableActionButton}
                            onClick={() => console.log(prop.editpathname)}
                          >
                            <Edit className={classes2.tableActionButtonIcon + ' ' + classes2.edit} />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <DeleteDialog path={prop.deletepathname} id={prop.id} />
                    </TableCell>
                  ) : null}
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
  tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf(['warning', 'primary', 'danger', 'success', 'info', 'rose', 'gray']),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
