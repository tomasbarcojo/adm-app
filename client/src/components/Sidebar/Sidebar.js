/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// core components
import AdminNavbarLinks from "../Navbar/AdminNavbarLinks";
import RTLNavbarLinks from "../Navbar/RTLNavbarLinks.js";

import styles from "../../styles/components/sidebarStyle.js";


import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddIcon from '@material-ui/icons/Add';

const NestedLinksTheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiListItemIcon: {
      // Name of the rule
      root: {
        // Some CSS
        color: 'white',
        minWidth: '39px'
      },
    },
  },
});

const NestedLinks = [ //this could be added in dashboardRoutes for the nested links. To do de same as links variable
  { layout: '/admin', path: '/test1' },
  { layout: '/admin', path: '/test2' },
  { layout: '/admin', path: '/test3' }
]

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  console.log(routes)

  const handleClick = () => {
    setOpen(!open);
  };

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (!prop.nestedList) {
          const listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });
          return (
            <NavLink
              to={prop.layout + prop.path}
              className={classes.item} //activePro did not make effect because it's unused
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)} //this is for "Table List" Icon
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses)} //this is for the rest of the icons on the side bar list
                    />
                  )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        }
      })}
    </List>
  );

  // WORKING ON THIS
  var linksNested = (
    <List disablePadding>
      {routes.map((prop, key) => {
        if (prop.nestedList) {
          const listItemClassesNested = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
          const whiteFontClassesNested = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });
          return (
            <ThemeProvider theme={NestedLinksTheme}>
              <ListItem button className={classes.itemLinkNested + listItemClassesNested} onClick={handleClick}>
                <ListItemIcon>
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClassesNested)} //this is for "Table List" Icon
                  >
                    <InboxIcon />
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClassesNested)}
                  disableTypography={true}
                />
                {open ? <ExpandLess /> : <ExpandMore style={{ fill: "white" }} />}
              </ListItem>
              <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Proveedores"
                      className={classNames(classes.itemText, whiteFontClassesNested)}
                      disableTypography={true}
                    />
                  </ListItem>

                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Clientes"
                      className={classNames(classes.itemText, whiteFontClassesNested)}
                      disableTypography={true}
                    />
                  </ListItem>

                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Articulos"
                      className={classNames(classes.itemText, whiteFontClassesNested)}
                      disableTypography={true}
                    />
                  </ListItem>

                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <FormatListNumberedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Listados"
                      className={classNames(classes.itemText, whiteFontClassesNested)}
                      disableTypography={true}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </ThemeProvider>
          )
        }
      })}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <a
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {<AdminNavbarLinks />}
            {links}
            {linksNested}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="right"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}{linksNested}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
