// PrivateRoutes

import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  var logged = '';
  if (localStorage.length > 0 && localStorage.getItem('logged')) {
    logged = JSON.parse(localStorage.getItem('logged'));
  } else {
    logged = JSON.parse(sessionStorage.getItem('logged'));
  }

  if (!logged) {
    navigate('/login');
    return null;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoutes;
