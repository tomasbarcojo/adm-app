import React from 'react';
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/material/styles';
// core components
import styles from '../../styles/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Info(props) {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.infoText}>{children}</div>;
}

Info.propTypes = {
  children: PropTypes.node,
};
