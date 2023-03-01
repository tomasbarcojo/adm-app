import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import classNames from 'classnames';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/components/sidebarStyle.js';

const NestedLinksTheme = createTheme({
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: '39px',
      },
    },
    MuiListItem: {
      root: {
        margin: '10px 15px 0',
        width: 'auto',
      },
    },
    // MuiSvgIcon: {
    //   root: {
    //     color: `rgba(${255}, ${255}, ${255}, ${0.8})`,
    //   },
    // },
    MuiListItemText: {
      root: {
        color: `rgba(${255}, ${255}, ${255}, ${0.8})`,
      },
    },
  },
  MuiListItem: {
    root: {
      width: 'auto',
    },
  },
});

const useStyles = makeStyles(styles);

export default function NestedList({ prop }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function activeRoute(routeName) {
    // console.log(routeName)
    // console.log(window.location.pathname)
    // console.log(window.location.href.indexOf(routeName))
    // console.log(routeName)
    if (window.location.pathname === routeName) return true;
    return false;
    // return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const listItemClassesNested = classNames({
    [' ' + classes['blue']]: activeRoute(prop.layout + prop.path),
  });
  const whiteFontClassesNested = classNames({
    [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
  });

  return (
    <div styles={{ marginTop: '10px' }}>
      <List disablePadding>
        <ThemeProvider theme={NestedLinksTheme}>
          <ListItem button className={classes.itemLinkNested + listItemClassesNested} onClick={handleClick}>
            {typeof prop.icon === 'string' ? (
              <Icon
                className={classNames(classes.itemIcon, whiteFontClassesNested)} //this is for "Table List" Icon
              >
                {prop.icon}
              </Icon>
            ) : (
              <prop.icon
                className={classNames(classes.itemIcon, whiteFontClassesNested)} //this is for the rest of the icons on the side bar list
              />
            )}
            <ListItemText
              primary={prop.name}
              className={classNames(classes.itemText, whiteFontClassesNested)}
              disableTypography={true}
            />
            {open ? (
              <ExpandLess style={{ fill: `rgba(${255}, ${255}, ${255}, ${0.8})` }} />
            ) : (
              <ExpandMore style={{ fill: `rgba(${255}, ${255}, ${255}, ${0.8})` }} />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto">
            <List component="div" disablePadding>
              {prop.nestedData &&
                prop.nestedData.map((data) => {
                  return (
                    <>
                      <NavLink
                        to={data.layout + data.path}
                        className={classes.item} //activePro did not make effect because it's unused
                        activeClassName="active"
                        key={prop}
                      >
                        <ListItem
                          button
                          className={
                            classes.nested +
                            classNames({
                              [' ' + classes['blue']]: activeRoute(data.layout + data.path),
                            })
                          }
                        >
                          <ListItemIcon>
                            {typeof prop.icon === 'string' ? (
                              <Icon
                                className={classNames(
                                  classes.itemIcon,
                                  classNames({
                                    [' ' + classes.whiteFont]: activeRoute(data.layout + data.path),
                                  }),
                                )} //this is for "Table List" Icon
                              >
                                {data.icon}
                              </Icon>
                            ) : (
                              <data.icon
                                className={classNames(
                                  classes.itemIcon,
                                  classNames({
                                    [' ' + classes.whiteFont]: activeRoute(data.layout + data.path),
                                  }),
                                )} //this is for the rest of the icons on the side bar list
                              />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={data.name}
                            className={classNames(classes.itemText, whiteFontClassesNested)}
                            disableTypography={true}
                          />
                        </ListItem>
                      </NavLink>
                    </>
                  );
                })}
            </List>
          </Collapse>
        </ThemeProvider>
      </List>
    </div>
  );
}
