// PrivateRoutes

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const logged = JSON.parse(localStorage.getItem('logged'));

  return (
    <Route {...rest} render={props => (
     logged ? (
      < Component  {...props} />
      ) : (
        <Redirect to='/login'/>
          )
      )} 
    />
  )
};


export default PrivateRoutes;