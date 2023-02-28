import React from 'react';
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/material/styles';
// core components
import styles from '../../styles/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Danger(props) {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.dangerText}>{children}</div>;
}

Danger.propTypes = {
  children: PropTypes.node,
};
