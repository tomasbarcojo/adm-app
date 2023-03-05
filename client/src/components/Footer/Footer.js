/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/styles';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
// core components
import styles from '../../styles/components/footerStyle';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
            <a href="https://pedixwpp.com/activa" target="_blank" className={classes.a}>
              Activa SRL
            </a>
            , hecho con ♥ por Tomas Barcojo
          </span>
        </p>
      </div>
    </footer>
  );
}
