// PrivateRoutes

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  var logged = '';
  if (localStorage.length > 0 && localStorage.getItem('logged')) {
    logged = JSON.parse(localStorage.getItem('logged'));
  } else {
    logged = JSON.parse(sessionStorage.getItem('logged'));
  }

  return <Route {...rest} render={(props) => (logged ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoutes;
