import React from 'react';
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/styles';
// core components
import styles from '../../styles/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Success(props) {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.successText}>{children}</div>;
}

Success.propTypes = {
  children: PropTypes.node,
};
