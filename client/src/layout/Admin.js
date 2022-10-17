import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from '../routes/dashboardRoutes';

import styles from '../styles/layouts/adminStyle';

import bgImage from '../images/sidebar-4.jpg';
import logo from '../images/reactlogo.png';
import Dashboard from '../views/Dashboard/Dashboard.js';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.nestedData) {
        return prop.nestedData.map((route, key) => {
          return <Route exact path={route.layout + route.path} component={route.component} key={key} />;
        });
      } else return <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  // const [image, setImage] = React.useState(bgImage);
  // const [color, setColor] = React.useState("blue");
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const handleImageClick = image => {
  //   setImage(image);
  // };
  // const handleColorClick = color => {
  //   setColor(color);
  // };
  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };
  // const resizeFunction = () => {
  //   if (window.innerWidth >= 960) {
  //     setMobileOpen(false);
  //   }
  // };
  // initialize and destroy the PerfectScrollbar plugin
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  //   window.addEventListener("resize", resizeFunction);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener("resize", resizeFunction);
  //   };
  // }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Activa SRL'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={routes} handleDrawerToggle={handleDrawerToggle} {...rest} />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
