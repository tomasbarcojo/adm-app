import React from 'react';
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/styles';
// core components
import styles from '../../styles/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Quote(props) {
  const classes = useStyles();
  const { text, author } = props;
  return (
    <blockquote className={classes.defaultFontStyle + ' ' + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node,
};
